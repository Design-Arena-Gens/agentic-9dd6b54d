import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Playlists",
    description:
      "Build your own vibe soon. Until then, dive into daily curated mixes handpicked from Deezer charts.",
    href: "/",
  },
  {
    title: "Made for you",
    description:
      "Personalized mixes are in progress. Explore trending tracks to craft your own flow.",
    href: "/search",
  },
  {
    title: "Future gems",
    description:
      "Discover emerging artists through the search chips and indulge in experimental sounds.",
    href: "/search?q=indie",
  },
];

export default function CollectionPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Your library</h1>
        <p className="text-sm text-zinc-400">
          User accounts are coming next. Meanwhile, bookmark your favorites directly on Deezer and
          keep streaming in Moonbeam.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.title}
            href={collection.href}
            className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/15 hover:bg-white/10"
          >
            <div>
              <h2 className="text-xl font-semibold text-white group-hover:text-[#1ed760]">
                {collection.title}
              </h2>
            </div>
            <p className="text-sm text-zinc-400">{collection.description}</p>
            <span className="inline-flex items-center gap-2 text-xs text-[#1ed760] transition group-hover:gap-3 group-hover:text-white">
              Explore
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
