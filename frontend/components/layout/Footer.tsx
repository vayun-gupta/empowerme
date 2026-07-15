import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-surface-container-low border-t border-outline-variant/30 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 gap-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-xl font-bold text-primary font-display">EmpowerMe</span>
          <p className="text-xs text-on-surface-variant max-w-xs">
            Practice high-stakes leadership conversations. Built for women in Indian academia.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-8">
          <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Home</Link>
          <Link href="/scenarios" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Scenarios</Link>
          <Link href="/dashboard" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
        </nav>
        <div className="text-xs text-on-surface-variant/70 font-medium">
          © {new Date().getFullYear()} EmpowerMe. Supporting Women in STEM.
        </div>
      </div>
    </footer>
  );
}
