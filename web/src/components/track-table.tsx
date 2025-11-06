import Image from "next/image";
import Link from "next/link";
import { PreviewButton } from "./preview-button";
import type { DeezerTrack } from "@/lib/deezer";

type TrackTableProps = {
  tracks: DeezerTrack[];
};

export function TrackTable({ tracks }: TrackTableProps) {
  if (!tracks.length) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-12 text-center text-sm text-zinc-400">
        Start typing to discover songs across the globe.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <table className="min-w-full divide-y divide-white/5 text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-zinc-400">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Album</th>
            <th className="px-6 py-4">Duration</th>
            <th className="px-6 py-4">Preview</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tracks.map((track, index) => {
            const durationMinutes = Math.floor(track.duration / 60);
            const durationSeconds = track.duration % 60;
            return (
              <tr
                key={track.id}
                className="group transition hover:bg-white/5"
              >
                <td className="px-6 py-4 text-xs text-zinc-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        track.album.cover_medium ||
                        track.album.cover ||
                        track.album.cover_big
                      }
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-lg object-cover shadow-lg shadow-black/30"
                    />
                    <div>
                      <Link
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white hover:underline"
                      >
                        {track.title}
                      </Link>
                      <div className="text-xs text-zinc-400">
                        {track.artist.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300">
                  {track.album.title}
                </td>
                <td className="px-6 py-4 text-xs text-zinc-400">
                  {durationMinutes}:{durationSeconds.toString().padStart(2, "0")}
                </td>
                <td className="px-6 py-4">
                  <PreviewButton previewUrl={track.preview} label="Preview" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
