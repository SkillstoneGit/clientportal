"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface WelcomeCardProps {
  name: string;
  logo?: string;
  className?: string;
}

export function WelcomeCard({ name, logo, className }: WelcomeCardProps) {
  return (
    <Card className={cn("overflow-hidden group relative", className)}>
      <AspectRatio ratio={382/264}>
        <div className="absolute inset-0">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            alt="Office"
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Tag */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#00CED1] text-white z-10">
            WELCOME
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {logo ? (
              <Image
                src={logo}
                alt={name}
                width={200}
                height={80}
                className="object-contain"
              />
            ) : (
              <h1 className="text-4xl font-extrabold text-white">
                {name}
              </h1>
            )}
          </div>
        </div>
      </AspectRatio>
    </Card>
  );
}