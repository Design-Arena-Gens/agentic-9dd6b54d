"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Disc3,
  Headphones,
  Home,
  Library,
  Radio,
  Search,
  Sparkles,
} from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/radio", label: "Radio", icon: Radio },
];

const collections = [
  { href: "/collection/playlists", label: "Playlists" },
  { href: "/collection/made-for-you", label: "Made for you" },
  { href: "/collection/future-gems", label: "Future gems" },
  { href: "/collection/live", label: "Live sets" },
];

const stations = [
  { label: "Lo-Fi Nights", icon: Sparkles },
  { label: "Top Hits", icon: Disc3 },
  { label: "Chill Vibes", icon: Headphones },
  { label: "Indie Radio", icon: Radio },
  { label: "Jazz Lounge", icon: Library },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col gap-6 bg-black/30 p-6 text-sm lg:flex">
      <Link href="/" className="block">
        <div className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1ed760] font-bold text-black">
            μ
          </div>
          <span>Moonbeam</span>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {primaryLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            isActive={
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href))
            }
          />
        ))}
      </nav>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-500">
          <span>Your Library</span>
          <Link
            href="/collection"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            See all
          </Link>
        </div>
        <div className="space-y-2">
          {collections.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              {entry.label}
              <span className="text-zinc-500">∙∙∙</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wide text-zinc-500">
          Stations for you
        </h3>
        <div className="space-y-2">
          {stations.map((station) => {
            const StationIcon = station.icon;
            return (
              <button
                key={station.label}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-white/10 to-white/0 px-3 py-2 text-left text-sm text-zinc-200 transition hover:from-white/20 hover:text-white"
              >
                <StationIcon className="h-4 w-4 text-[#1ed760]" />
                <span>{station.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
