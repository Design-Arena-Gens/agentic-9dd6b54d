import Image from "next/image";
import Link from "next/link";
import {
  getChartAlbums,
  getChartPlaylists,
  getChartTracks,
  getFeaturedTrack,
} from "@/lib/deezer";
import { TrackCard } from "@/components/track-card";
import { PlaylistCard } from "@/components/playlist-card";
import { AlbumCard } from "@/components/album-card";
import { PreviewButton } from "@/components/preview-button";
import { ArrowRight, Headphones } from "lucide-react";

export default async function HomePage() {
  const [featuredTrack, topTracks, playlists, albums] = await Promise.all([
    getFeaturedTrack(),
    getChartTracks(12),
    getChartPlaylists(8),
    getChartAlbums(8),
  ]);

  return (
    <div className="flex flex-col gap-10">
      {featuredTrack ? (
        <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#222429] via-[#121419] to-black p-8 shadow-2xl shadow-black/40">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
              <Image
                src={
                  featuredTrack.album.cover_big ||
                  featuredTrack.album.cover_medium ||
                  featuredTrack.album.cover
                }
                alt={`${featuredTrack.title} artwork`}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-wide text-[#1ed760]">
                <Headphones className="h-3.5 w-3.5" />
                Featured for you
              </div>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                {featuredTrack.title}
              </h1>
              <p className="text-sm text-zinc-400 sm:text-base">
                Dive into the sound of{" "}
                <span className="text-white">{featuredTrack.artist.name}</span>{" "}
                with a 30-second preview powered by Deezer&apos;s open charts.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span>
                  {Math.floor(featuredTrack.duration / 60)}:
                  {(featuredTrack.duration % 60).toString().padStart(2, "0")}{" "}
                  min
                </span>
                <span className="text-zinc-600">•</span>
                <span>{Math.max(1, Math.round(featuredTrack.rank / 1000))}k</span>
                <span className="text-zinc-600">•</span>
                <Link
                  href={featuredTrack.link}
                  target="_blank"
                  className="text-[#1ed760] transition hover:text-white"
                >
                  Open on Deezer
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <PreviewButton previewUrl={featuredTrack.preview} />
                <Link
                  href={`/search?q=${encodeURIComponent(
                    featuredTrack.artist.name
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  Explore artist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Today&apos;s vibe</h2>
            <p className="text-sm text-zinc-400">
              Curated by global charts. Tap preview and feel the energy right
              away.
            </p>
            <div className="grid gap-4">
              {topTracks.slice(0, 4).map((track) => (
                <div
                  key={`vibe-${track.id}`}
                  className="flex items-center gap-4 rounded-2xl bg-black/40 p-4"
                >
                  <Image
                    src={
                      track.album.cover_medium ||
                      track.album.cover_big ||
                      track.album.cover
                    }
                    alt={track.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-white">
                      {track.title}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {track.artist.name}
                    </span>
                  </div>
                  <PreviewButton previewUrl={track.preview} label="Play" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Top tracks now</h2>
          <Link
            href="/search?q=chart"
            className="text-xs font-medium text-zinc-400 transition hover:text-white"
          >
            See more
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 pr-2">
          {topTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Curated playlists
          </h2>
          <Link
            href="https://www.deezer.com/channels/explore"
            target="_blank"
            className="text-xs font-medium text-zinc-400 transition hover:text-white"
          >
            Explore on Deezer
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      <section className="space-y-5 pb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Trending albums</h2>
          <Link
            href="/search?q=album"
            className="text-xs font-medium text-zinc-400 transition hover:text-white"
          >
            Search albums
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
}
