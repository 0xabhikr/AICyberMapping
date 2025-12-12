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
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: username, 
          phone: phone,
          email: email,
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2)); 
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to backend");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 space-y-8">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Example Card</CardTitle>
          <CardDescription>This is a ShadCN card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here. You can add buttons, graphs, etc.</p>
        </CardContent>
        <CardFooter>
          <p>Card footer</p>
        </CardFooter>
      </Card>

      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-black/20 dark:border-white/20">
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
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
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
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
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
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-lg px-6 py-3 w-full backdrop-blur-2xl bg-black/10 dark:bg-white/20 
                       border border-black/20 dark:border-white/40 
                       shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.25)] 
                       text-black dark:text-white transition hover:scale-105"
          >
            Submit
          </button>
        </form>
        {response && (
          <pre className="mt-4 p-3 bg-gray-200 dark:bg-gray-800 rounded text-black dark:text-white whitespace-pre-wrap">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
