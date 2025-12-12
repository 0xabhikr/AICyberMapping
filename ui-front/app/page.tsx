"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">

      <h1 className="text-3xl font-bold mb-10">
        Choose Your Tool With AI
      </h1>

      <div className="flex flex-wrap justify-center gap-6">

        <Link
          href="/google-dorking"
          className="rounded-lg px-6 py-3 backdrop-blur-2xl bg-black/10 dark:bg-white/20 
      border border-black/20 dark:border-white/40 
      shadow-[0_0_20px_rgba(0,0,0,0.2)] 
      dark:shadow-[0_0_30px_rgba(255,255,255,0.25)] 
      text-black dark:text-white transition hover:scale-105"
        >
          Google Dorking
        </Link>

        <Link
          href="/cyber-graphs"
          className="rounded-lg px-6 py-3 backdrop-blur-2xl bg-black/10 dark:bg-white/20 
      border border-black/20 dark:border-white/40 
      shadow-[0_0_20px_rgba(0,0,0,0.2)] 
      dark:shadow-[0_0_30px_rgba(255,255,255,0.25)] 
      text-black dark:text-white transition hover:scale-105"
        >
          AI Cyber Graphs
        </Link>

        <Link
          href="/cdr"
          className="rounded-lg px-6 py-3 backdrop-blur-2xl bg-black/10 dark:bg-white/20 
      border border-black/20 dark:border-white/40 
      shadow-[0_0_20px_rgba(0,0,0,0.2)] 
      dark:shadow-[0_0_30px_rgba(255,255,255,0.25)] 
      text-black dark:text-white transition hover:scale-105"
        >
          CDR Analaysis 
        </Link>

      </div>
    </div>

  );
}
