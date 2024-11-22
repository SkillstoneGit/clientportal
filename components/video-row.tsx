"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Video } from "@/types/video";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";

interface VideoRowProps {
  video: Video;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export function VideoRow({ video, provided, snapshot }: VideoRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && video.videoUrl) {
      videoRef.current.currentTime = 0.1; // Seek to first frame
      videoRef.current.addEventListener('loadeddata', () => setIsLoaded(true));
    }
  }, [video.videoUrl]);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        "flex items-center gap-4 p-4 hover:bg-accent cursor-grab",
        snapshot.isDragging && "shadow-lg ring-2 ring-primary bg-accent"
      )}
    >
      <div className="relative w-[100px] h-[146px] flex-shrink-0">
        {video.videoUrl && (
          <video
            ref={videoRef}
            preload="metadata"
            className={cn(
              "object-cover w-full h-full rounded-md",
              !isLoaded && "hidden"
            )}
            muted
            playsInline
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        )}
        {/* Fallback while video loads */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse rounded-md" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
}