"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Googledorking() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/dork-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email }),
      });

      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ error: "Error connecting to backend" });
    }
  };

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const groupByPlatform = () => {
    const grouped: Record<string, string[]> = {};
    if (!response) return grouped;

    const all = [
      ...(response.email_dorks || []),
      ...(response.phone_dorks || []),
      ...(response.username_dorks || []),
    ];

    all.forEach((item: any) => {
      if (!grouped[item.platform]) grouped[item.platform] = [];
      grouped[item.platform].push(item.query);
    });

    return grouped;
  };

  const groupedData = groupByPlatform();

  return (
    <div className="min-h-screen flex items-start pt-30 justify-center px-8 py-12 space-x-8 bg-gray-100 dark:bg-gray-900">
      <Card className="w-1/2 max-h-[80vh] overflow-auto">
        <CardHeader>
          <CardTitle>Dorking Results</CardTitle>
          <CardDescription>Copy any dork with one click</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!response ? (
            <p className="text-gray-500 dark:text-gray-400">
              Submit the form to see results here.
            </p>
          ) : (
            Object.keys(groupedData).map((platform) => (
              <div
                key={platform}
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">
                  {platform}
                </h3>

                <div className="space-y-3">
                  {groupedData[platform].map((query, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <pre className="text-sm text-black dark:text-white whitespace-pre-wrap">
                        {query}
                      </pre>

                      <button
                        onClick={() => copy(query)}
                        className="ml-3 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 active:scale-95"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>

        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All results come from your generated dorks.
          </p>
        </CardFooter>
      </Card>

      <div className="w-1/2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-black/20 dark:border-white/20">
        <h1 className="text-xl font-bold mb-4 text-center text-black dark:text-white">
          User Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">
              Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-lg px-6 py-3 w-full bg-green-600 text-white dark:bg-green-500 dark:text-black shadow hover:scale-105 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
