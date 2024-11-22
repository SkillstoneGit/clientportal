"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  label?: string;
  labelColor?: string;
  className?: string;
}

export function ImageCard({
  imageUrl,
  title,
  description,
  label,
  labelColor = "#4CAF50",
  className
}: ImageCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <AspectRatio ratio={382/562}>
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          
          {label && (
            <div 
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white z-10"
              style={{ backgroundColor: labelColor }}
            >
              {label}
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
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