import { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/search/search-client";
import { TrackTable } from "@/components/track-table";
import { getChartTracks, searchTracks } from "@/lib/deezer";
import { TrackCard } from "@/components/track-card";

export const metadata: Metadata = {
  title: "Search | Moonbeam",
};

type SearchPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const queryParam = searchParams?.q;
  const query = Array.isArray(queryParam) ? queryParam[0] ?? "" : queryParam ?? "";
  const [tracks, trending] = await Promise.all([
    query ? searchTracks(query, 30) : Promise.resolve([]),
    query ? Promise.resolve([]) : getChartTracks(8),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white">Search the catalog</h1>
          <p className="text-sm text-zinc-400">
            Powered by Deezer&apos;s free API. Discover moods, artists, and rare gems.
          </p>
        </div>
        <Suspense fallback={<div className="text-sm text-zinc-400">Loading search…</div>}>
          <SearchClient initialQuery={query} />
        </Suspense>
      </header>

      {query ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>
              Showing {tracks.length} result{tracks.length === 1 ? "" : "s"} for{" "}
              <span className="text-white">&ldquo;{query}&rdquo;</span>
            </span>
          </div>
          <TrackTable tracks={tracks} />
        </section>
      ) : (
        <section className="space-y-5 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Trending right now</h2>
            <span className="text-xs text-zinc-500">Tap a chip to jump in</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 pr-2">
            {trending.map((track, index) => (
              <TrackCard key={`trend-${track.id}`} track={track} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
