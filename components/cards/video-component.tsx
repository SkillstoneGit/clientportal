"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface VideoComponentProps {
  title: string;
  description?: string;
  videoUrl?: string;
  label?: string;
  labelColor?: string;
  progress?: number;
  className?: string;
}

export function VideoComponent({
  title,
  description,
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  label,
  labelColor = "#4CAF50",
  progress = 0,
  className
}: VideoComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlaying = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card 
      className={cn("overflow-hidden group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }}
    >
      <AspectRatio ratio={382/562}>
        <div className="absolute inset-0 bg-[#15182D]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

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
          {label && (
            <div 
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white z-10"
              style={{ backgroundColor: labelColor }}
            >
              {label}
            </div>
          )}

          {/* Play button */}
          <button
            onClick={togglePlaying}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FFC830] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
          </button>

          {/* Title overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
              "flex flex-col justify-end p-4 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-white font-semibold line-clamp-2 mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-white/80 text-sm line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </AspectRatio>
    </Card>
  );
}