"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  imageUrl: string;
  label?: string;
  labelColor?: string;
  className?: string;
}

export function CompanyCard({
  imageUrl,
  label,
  labelColor = "#4CAF50",
  className
}: CompanyCardProps) {
  return (
    <Card className={cn("overflow-hidden relative", className)}>
      <AspectRatio ratio={16/9}>
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt="Company"
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
        </div>
      </AspectRatio>
    </Card>
  );
}