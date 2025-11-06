"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PreviewButtonProps = {
  previewUrl: string | null | undefined;
  label?: string;
};

const activePlayers = new Set<HTMLAudioElement>();

export function PreviewButton({ previewUrl, label }: PreviewButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDisabled = !previewUrl;

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        activePlayers.delete(audio);
      }
    };
  }, []);

  const togglePlayback = async () => {
    if (!previewUrl) return;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(previewUrl);
      audioRef.current = audio;
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        activePlayers.delete(audio!);
      });
      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });
      audio.addEventListener("play", () => {
        setIsPlaying(true);
      });
    }

    if (audio.paused) {
      activePlayers.forEach((player) => {
        if (player !== audio) {
          player.pause();
        }
      });
      activePlayers.add(audio);
      try {
        await audio.play();
      } catch {
        // ignore play errors
      }
    } else {
      audio.pause();
      activePlayers.delete(audio);
    }
  };

  return (
    <button
      type="button"
      onClick={togglePlayback}
      disabled={isDisabled}
      className={`flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium transition ${
        isDisabled
          ? "cursor-not-allowed border-white/5 text-zinc-500"
          : "bg-white/10 text-white hover:bg-[#1ed760] hover:text-black"
      }`}
    >
      {isPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Play className="ml-1 h-4 w-4" />
      )}
      <span>{label ?? (isPlaying ? "Pause preview" : "Play preview")}</span>
    </button>
  );
}
