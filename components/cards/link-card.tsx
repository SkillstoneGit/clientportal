"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check } from "lucide-react";

interface LinkCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  label?: string;
  labelColor?: string;
  ctaText?: string;
  backgroundColor?: string;
  textColor?: string;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

export function LinkCard({
  title,
  description,
  imageUrl,
  label,
  labelColor = "#4CAF50",
  ctaText = "View More",
  backgroundColor,
  textColor,
  progress = 0,
  onClick,
  className
}: LinkCardProps) {
  const isComplete = progress === 100;

  return (
    <Card 
      className={cn("overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <div className="relative p-6">
        {/* Label & Progress */}
        <div className="flex items-center justify-between mb-8">
          {label && (
            <div 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: labelColor }}
            >
              {label}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {isComplete ? (
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            ) : (
              <Progress value={progress} className="w-24" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 
            className="text-xl font-semibold"
            style={{ color: textColor }}
          >
            {title}
          </h3>
          
          {description && (
            <p 
              className="text-sm"
              style={{ color: textColor }}
            >
              {description}
            </p>
          )}

          {imageUrl && (
            <div className="relative aspect-[7/5] mt-4">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <Button
            onClick={onClick}
            className="w-full mt-6"
            variant={isComplete ? "secondary" : "default"}
          >
            {isComplete ? "Review" : ctaText}
          </Button>
        </div>
      </div>
    </Card>
  );
}