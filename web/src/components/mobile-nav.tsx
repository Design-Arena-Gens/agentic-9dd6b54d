"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/collection", label: "Library", icon: Library },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur lg:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 text-xs ${
              isActive ? "text-[#1ed760]" : "text-zinc-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
