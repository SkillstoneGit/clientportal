"use client";

import { cn } from "@/lib/utils";

interface SubSectionCardProps {
  number: number;
  title: string;
  className?: string;
}

export function SubSectionCard({
  number,
  title,
  className
}: SubSectionCardProps) {
  const formattedNumber = number.toString().padStart(2, '0');

  return (
    <div className={cn(
      "flex items-center gap-4 py-2 pr-16",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
        <span className="text-2xl font-bold text-primary-foreground">
          {formattedNumber}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-primary line-clamp-2">
        {title}
      </h3>
    </div>
  );
}