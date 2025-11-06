import Image from "next/image";
import Link from "next/link";
import type { DeezerAlbum } from "@/lib/deezer";

type AlbumCardProps = {
  album: DeezerAlbum;
};

export function AlbumCard({ album }: AlbumCardProps) {
  const deezerLink = `https://www.deezer.com/album/${album.id}`;
  return (
    <Link
      href={deezerLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/10"
    >
      <Image
        src={album.cover_big || album.cover_medium || album.cover}
        alt={`${album.title} cover`}
        width={220}
        height={220}
        className="h-40 w-40 flex-shrink-0 rounded-xl object-cover shadow-lg shadow-black/40 transition group-hover:scale-105"
      />
      <div>
        <h3 className="text-base font-semibold text-white group-hover:text-[#1ed760]">
          {album.title}
        </h3>
        <p className="text-sm text-zinc-400">Tap to view on Deezer</p>
      </div>
    </Link>
  );
}
