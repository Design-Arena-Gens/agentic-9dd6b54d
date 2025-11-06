"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

type SearchClientProps = {
  initialQuery?: string;
};

const suggestions = [
  "Synthwave",
  "Afrobeats",
  "Deep house",
  "Indie pop",
  "Jazz",
  "Lo-fi",
  "Top hits",
];

export function SearchClient({ initialQuery = "" }: SearchClientProps) {
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      const search = params.toString();
      startTransition(() => {
        router.replace(search ? `${pathname}?${search}` : pathname);
      });
    }, 350);

    return () => clearTimeout(timeout);
  }, [value, pathname, router, searchParams, startTransition]);

  const clear = () => setValue("");

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search for songs, artists, moods..."
          className="w-full rounded-full border border-white/10 bg-black/50 py-4 pl-12 pr-12 text-sm text-white placeholder:text-zinc-500 focus:border-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1ed760]/40"
        />
        {value ? (
          <button
            type="button"
            onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-zinc-300 transition hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {suggestions.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setValue(chip)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300 transition hover:border-[#1ed760] hover:bg-[#1ed760]/10 hover:text-white"
          >
            #{chip}
          </button>
        ))}
      </div>
      {isPending ? (
        <div className="text-xs text-zinc-500">Searching the catalog…</div>
      ) : null}
    </div>
  );
}
