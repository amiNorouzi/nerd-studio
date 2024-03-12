"use client";
import React, { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "@/components/svg-icons";

interface IProps {
  audioUrl?: string;
}

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map(v => `0${Math.floor(v)}`.slice(-2))
    .join(":");

/**
 * this component is an audio player with wave form
 * @param audioUrl - audio url
 * @constructor
 */
export function AudioPlayer({
  audioUrl = "/testMusic/background-music-for-short-video-hip-hop-beat-piano-and-cello-30-sec-192914.mp3",
}: IProps) {
  const waveFormRef = useRef<HTMLDivElement>(null);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: waveFormRef,
    height: 40,
    waveColor: "#fff",
    progressColor: "#9372ee",
    url: audioUrl,
    barGap: 4,
    barWidth: 2,
    //this plugin show the timeline
    // plugins: useMemo(() => [Timeline.create()], []),
  });

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className=" h-fit w-fit p-0 transition-all hover:scale-110"
        onClick={() => wavesurfer?.playPause()}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-primary" />
        ) : (
          <Play className="h-4 w-4 fill-primary" />
        )}
      </Button>
      <div ref={waveFormRef} className="w-full" />
    </div>
  );
}
