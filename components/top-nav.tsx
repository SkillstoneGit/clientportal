"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { fetchPlaylists } from "@/lib/api";
import type { Playlist } from "@/types/playlist";

interface TopNavProps {
  onPlaylistSelect?: (playlist: Playlist) => void;
}

export function TopNav({ onPlaylistSelect }: TopNavProps) {
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("Onboarding");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const data = await fetchPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error("Failed to load playlists:", error);
        setError("Failed to load playlists");
      }
    };

    loadPlaylists();
  }, []);

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedTitle(playlist.attributes.title);
    onPlaylistSelect?.(playlist);
    setOpen(false);
  };

  return (
    <div className="h-14 border-b border-border/50 flex items-center justify-between px-4">
      <div className="flex items-center">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-8 gap-2 font-medium text-primary"
            >
              {selectedTitle}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-[240px] bg-[#B77BF3] border-none"
            align="start"
            sideOffset={8}
          >
            <DropdownMenuItem 
              className="text-[#15182D] hover:bg-white/20 focus:bg-white/20 focus:text-[#15182D] font-medium"
              onSelect={() => {
                setSelectedTitle("Onboarding");
                onPlaylistSelect?.(null);
              }}
            >
              Onboarding
            </DropdownMenuItem>
            {playlists.map((playlist) => (
              <DropdownMenuItem
                key={playlist.id}
                className="text-[#15182D] hover:bg-white/20 focus:bg-white/20 focus:text-[#15182D] font-medium"
                onSelect={() => handlePlaylistSelect(playlist)}
              >
                {playlist.attributes.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
}