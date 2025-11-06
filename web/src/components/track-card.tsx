import Image from "next/image";
import Link from "next/link";
import { DeezerTrack } from "@/lib/deezer";
import { PreviewButton } from "./preview-button";

type TrackCardProps = {
  track: DeezerTrack;
  index?: number;
};

export function TrackCard({ track, index }: TrackCardProps) {
  const durationMinutes = Math.floor(track.duration / 60);
  const durationSeconds = track.duration % 60;

  return (
    <div className="group relative flex min-w-[220px] max-w-sm flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            src={track.album.cover_big || track.album.cover || track.album.cover_medium}
            alt={`${track.title} cover art`}
            width={120}
            height={120}
            className="h-28 w-28 rounded-xl object-cover shadow-lg shadow-black/40 transition group-hover:scale-105"
          />
          {typeof index === "number" ? (
            <span className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1ed760] text-sm font-semibold text-black shadow-lg shadow-black/40">
              {index + 1}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <Link
            href={track.link}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-2 text-base font-semibold hover:underline"
          >
            {track.title}
          </Link>
          <span className="text-sm text-zinc-300">{track.artist.name}</span>
          <span className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400">
            <span>{durationMinutes}:{durationSeconds.toString().padStart(2, "0")}</span>
            <span>•</span>
            <span>
              {Math.max(1, Math.round(track.rank / 1000))}k listeners
            </span>
          </span>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <PreviewButton previewUrl={track.preview} />
        <Link
          href={track.artist ? `/search?q=${encodeURIComponent(track.artist.name)}` : "#"}
          className="text-xs text-[#1ed760] transition hover:text-white"
        >
          more by {track.artist.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}
