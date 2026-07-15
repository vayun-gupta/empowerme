import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";

export default function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className={`pt-20 flex-1 relative ${className}`}>{children}</main>
      <Footer />
    </div>
  );
}
