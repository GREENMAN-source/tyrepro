"use client";

import Link from "next/link";
import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Book", "/appointment"],
  ["About", "/about"],
  ["Contact", "/contact"]
] as const;

export function PublicNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/84 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">TP</span>
          <span>TyrePro Motors</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
