
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { user, phone, email } = req.body;

    if (!user || !phone || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    return res.status(200).json({
      username: user,
      phone,
      email,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
