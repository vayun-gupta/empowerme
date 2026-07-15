"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/dashboard", label: "Dashboard" },
];

interface TopNavProps {
  variant?: "default" | "chat";
  progressSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
}

export default function TopNav({ variant = "default", progressSlot, actionsSlot }: TopNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 w-full z-50 h-20 bg-surface/90 backdrop-blur-md border-b border-outline-variant/40">
      <div className="flex justify-between items-center px-4 md:px-8 lg:px-16 h-full max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight font-display shrink-0">
            EmpowerMe
          </Link>
          {variant === "chat" && progressSlot && (
            <>
              <div className="h-6 w-px bg-outline-variant/50 hidden sm:block" />
              <div className="hidden sm:block min-w-0">{progressSlot}</div>
            </>
          )}
        </div>

        {variant === "default" && (
          <nav className="hidden md:flex gap-10 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "text-primary font-bold border-b-2 border-primary pb-1 transition-all"
                    : "text-on-surface-variant font-medium hover:text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {variant === "chat" && actionsSlot}
          <div className="w-10 h-10 rounded-full bg-primary-fixed hidden sm:flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined">person</span>
          </div>
          {variant === "default" && (
            <button
              aria-label="Open navigation menu"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>
          )}
        </div>
      </div>

      {variant === "default" && menuOpen && (
        <nav className="md:hidden bg-surface/95 backdrop-blur-md border-b border-outline-variant/40 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={
                isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant font-medium hover:text-primary"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
