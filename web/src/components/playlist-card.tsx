import Image from "next/image";
import Link from "next/link";
import type { DeezerPlaylist } from "@/lib/deezer";

type PlaylistCardProps = {
  playlist: DeezerPlaylist;
};

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const deezerLink = `https://www.deezer.com/playlist/${playlist.id}`;
  return (
    <Link
      href={deezerLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/10"
    >
      <div className="relative mb-4">
        <Image
          src={
            playlist.picture_big || playlist.picture_medium || playlist.picture
          }
          alt={`${playlist.title} artwork`}
          width={220}
          height={220}
          className="h-40 w-40 rounded-xl object-cover shadow-lg shadow-black/40 transition group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/20 to-transparent" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-white group-hover:text-[#1ed760]">
          {playlist.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          {playlist.nb_tracks} curated tracks · open in Deezer
        </p>
      </div>
    </Link>
  );
}
