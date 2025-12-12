import type { NextApiRequest, NextApiResponse } from "next";

// -----------------------------------------------------
// Helper: Generate phone variants
// -----------------------------------------------------
function generatePhoneVariants(phone: string): string[] {
  const variants = new Set<string>();
  const raw = phone.trim().replace(/[\s-]/g, "");

  let number = raw.startsWith("+") ? raw.slice(1) : raw;

  // +phone or raw variants
  variants.add(raw);
  variants.add(number);
  variants.add("+" + number);

  // Indian formatting: 91xxxxxxxxxx → 0xxxxxxxxx
  if (number.startsWith("91") && number.length > 2) {
    variants.add("0" + number.slice(2));
  }

  return Array.from(variants);
}

// -----------------------------------------------------
// Dork Templates 
// -----------------------------------------------------
const customDorkTemplates: Record<string, string[]> = {
  Instagram: [
    'site:instagram.com intext:"{email}"',
    'site:instagram.com intext:"{phone}"',
    'site:instagram.com inurl:"/p/" intext:"{phone}"',
    'site:instagram.com intitle:"Instagram photo by *" intext:"{email}"',
    'site:instagram.com inurl:"/{username}"',
  ],
  Facebook: [
    'site:facebook.com intext:"{email}"',
    'site:facebook.com intext:"{phone}"',
  ],
  Twitter: [
    'site:twitter.com intext:"{email}"',
    'site:twitter.com intext:"{phone}"',
    'site:twitter.com intext:"DM me at {email}" | intext:"DM me at {phone}"',
    'site:twitter.com intext:"reach me on {email}" | intext:"reach me on {phone}"',
    'site:twitter.com/{username}',
  ],
  LinkedIn: [
    'site:linkedin.com intext:"{email}" | intext:"{phone}"',
    'site:linkedin.com inurl:"in/" intext:"{phone}"',
    'site:linkedin.com {username}',
  ],
  Amazon: [
    'site:amazon.com intext:"{phone}"',
    'site:amazon.com intext:"customer service" intext:"{phone}"',
    'site:amazon.com intext:"@amazon.com" filetype:csv',
  ],
  GitHub: [
    'site:github.com intext:"{email}"',
    'site:github.com intext:"{phone}"',
    'site:github.com intext:"contact me at{email}" | intext:"contact me at {phone}"',
    'site:github.com/{username}',
  ],
  GitLab: [
    'site:gitlab.com intext:"{email}"',
    'site:gitlab.com intext:"{phone}"',
  ],
  Common: [
    'site:facebook.com | site:twitter.com | site:instagram.com intext:"@gmail.com" | "@yahoo.com" | "@hotmail.com"',
    'site:facebook.com | site:twitter.com | site:instagram.com intext:"phone" | "contact" | "call" | "number"',
    'filetype:xls | filetype:csv intext:"@gmail.com" | "@yahoo.com" | "phone number"',
    'filetype:pdf intext:"{email}"',
    'filetype:csv intext:"{phone}"',
    'filetype:txt intext:"{email}"',
    'intext:"@{email}" site:pastebin.com',
  ],
};

// -----------------------------------------------------
// Dork Generators
// -----------------------------------------------------
function generateGoogleDorksForEmail(email?: string, phone?: string, username?: string) {
  if (!email) return [];

  const results: any[] = [];
  const emailDomain = email.split("@")[1];

  for (const [platform, templates] of Object.entries(customDorkTemplates)) {
    for (let template of templates) {
      if (!template.includes("{email}") && !template.includes("{email_domain}")) continue;

      const queries: string[] = [];

      let query = template.replace("{email}", email);

      if (query.includes("{email_domain}") && emailDomain) {
        query = query.replace("{email_domain}", emailDomain);
      }

      if (query.includes("{phone}") && phone) {
        const phoneVariants = generatePhoneVariants(phone);
        for (const variant of phoneVariants) {
          let q = query.replace("{phone}", variant);
          if (username) q = q.replace("{username}", username);
          queries.push(q);
        }
      } else {
        if (username) query = query.replace("{username}", username);
        queries.push(query);
      }

      for (const q of queries) {
        results.push({
          platform,
          query: q,
          url: "https://www.google.com/search?q=" + encodeURIComponent(q),
        });
      }
    }
  }

  return results;
}

function generateGoogleDorksForPhone(phone?: string, email?: string, username?: string) {
  if (!phone) return [];

  const results: any[] = [];
  const phoneVariants = generatePhoneVariants(phone);

  for (const [platform, templates] of Object.entries(customDorkTemplates)) {
    for (let template of templates) {
      if (!template.includes("{phone}")) continue;

      for (const variant of phoneVariants) {
        let query = template.replace("{phone}", variant);

        if (email) query = query.replace("{email}", email);
        if (username) query = query.replace("{username}", username);

        results.push({
          platform,
          query,
          url: "https://www.google.com/search?q=" + encodeURIComponent(query),
        });
      }
    }
  }

  return results;
}

function generateGoogleDorksForUsername(username?: string, email?: string, phone?: string) {
  if (!username) return [];

  const results: any[] = [];

  for (const [platform, templates] of Object.entries(customDorkTemplates)) {
    for (let template of templates) {
      if (!template.includes("{username}")) continue;

      let query = template.replace("{username}", username);

      if (email) query = query.replace("{email}", email);
      if (phone) {
        const pv = generatePhoneVariants(phone);
        query = query.replace("{phone}", pv[0]);
      }

      results.push({
        platform,
        query,
        url: "https://www.google.com/search?q=" + encodeURIComponent(query),
      });
    }
  }

  return results;
}

// -----------------------------------------------------
// API Route Handler
// -----------------------------------------------------
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { email, phone, username } = req.body;

  if (!email && !phone && !username) {
    return res.status(400).json({
      error: "At least one of email, phone, or username is required.",
    });
  }

  return res.status(200).json({
    email_dorks: generateGoogleDorksForEmail(email, phone, username),
    phone_dorks: generateGoogleDorksForPhone(phone, email, username),
    username_dorks: generateGoogleDorksForUsername(username, email, phone),
  });
}
