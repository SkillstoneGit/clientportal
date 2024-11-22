"use client";

import { Home, Users, PlayCircle, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: PlayCircle, label: "Content", href: "/playlist" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-16 bg-secondary/50 border-r border-border/50 flex flex-col items-center py-4 gap-2">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-primary font-bold">G</span>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-xl",
              isActive && "bg-primary/10 text-primary"
            )}
            title={item.label}
            onClick={() => router.push(item.href)}
          >
            <Icon className="h-5 w-5" />
          </Button>
        );
      })}
    </div>
  );
}