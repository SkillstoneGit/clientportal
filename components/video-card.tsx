"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Video } from "@/types/video";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { Check } from "lucide-react";

interface VideoCardProps {
  video: Video;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isSmall?: boolean;
}

export function VideoCard({ video, provided, snapshot, isSmall }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [video.videoUrl]);

  const togglePlaying = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    if (!videoRef.current) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        "group relative overflow-hidden cursor-grab",
        isSmall ? "w-[181.5px]" : "w-[242px]",
        snapshot.isDragging && "shadow-lg ring-2 ring-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={242/354}>
        {video.videoUrl && (
          <video
            ref={videoRef}
            className="object-cover w-full h-full rounded-t-lg"
            onTimeUpdate={handleProgress}
            onEnded={() => setIsPlaying(false)}
            muted
            playsInline
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Progress indicator */}
        <div className="absolute top-4 right-4 z-10">
          {progress === 100 ? (
            <div className="w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          ) : progress > 0 ? (
            <div className="w-6 h-6 rounded-full border-2 border-white relative">
              <svg className="absolute inset-0" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 0.88} 100`}
                  transform="rotate(-90 16 16)"
                />
              </svg>
            </div>
          ) : null}
        </div>

        {/* Label */}
        {video.label && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#4CAF50] text-white">
            {video.label}
          </div>
        )}

        {/* Play button */}
        <button
          onClick={togglePlaying}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FFC830] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
        </button>

        {/* Overlay with title and description */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
            "flex flex-col justify-end p-4 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <h3 className="text-white font-semibold line-clamp-2 mb-1">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-white/80 text-sm line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </AspectRatio>
    </Card>
  );
}