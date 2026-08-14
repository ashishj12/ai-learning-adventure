"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, Sparkles, Trophy, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/missions", label: "Missions", icon: Map },
  { href: "/ai-tutor", label: "AI Only Mode", icon: Sparkles },
  { href: "/progress", label: "Progress", icon: Trophy },
];

export function NavBar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 border-b border-black/20 bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-semibold text-paper focus-ring"
        >
          <Compass
            className="h-5 w-5 shrink-0 text-amber transition-transform duration-500 group-hover:rotate-45"
            aria-hidden
          />
          <span className="sm:hidden">AI Adventure</span>
          <span className="hidden sm:inline">AI Learning Adventure</span>
        </Link>

        {!isAdmin && (
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-1 sm:gap-2"
          >
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname?.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-ring",
                    active
                      ? "bg-amber text-navy-deep"
                      : "text-paper/65 hover:bg-white/5 hover:text-paper",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-paper/35 hover:bg-white/5 hover:text-paper/70 focus-ring"
              aria-label="Content management"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
