"use client";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionCard({
  label,
  title,
  description,
  className
}: SectionCardProps) {
  return (
    <div className={cn(
      "p-8 space-y-3",
      className
    )}>
      {label && (
        <span className="text-xs uppercase text-muted-foreground">
          {label}
        </span>
      )}
      
      <h2 className="text-4xl font-extrabold text-primary">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}