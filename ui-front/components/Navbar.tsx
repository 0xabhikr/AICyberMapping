"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-2 rounded-2xl backdrop-blur-[30px] bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/20 shadow-lg shadow-black/10 dark:shadow-white/10 transition-all duration-300 text-black dark:text-white">

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/20 dark:bg-black/20 border-none"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-none"
        >
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="text-xl font-bold">CyberTools</div>

      {/* <div className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/google-dorking" className="hover:underline">
          Google Dorking
        </Link>
        <Link href="/cyber-graphs" className="hover:underline">
          Cyber Graphs
        </Link>
        <Link href="/cdr" className="hover:underline">
          CDR
        </Link>
      </div> */}

      
    </nav>
  );
}
