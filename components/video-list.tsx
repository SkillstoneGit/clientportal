"use client";

import { Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoCard } from "./video-card";
import { VideoRow } from "./video-row";
import { Draggable } from "@hello-pangea/dnd";
import { LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StackViewIcon } from "./stack-view-icon";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Video } from "@/types/video";

type ViewMode = "grid" | "list" | "stack";

interface VideoListProps {
  videos?: Video[];
  droppableId: string;
  title: string;
  emptyState?: React.ReactNode;
  isContentPanel?: boolean;
  isLoading?: boolean;
}

function VideoSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-4 p-4">
        <Skeleton className="w-[100px] h-[146px] flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className={viewMode === "stack" ? "w-[242px]" : "w-[181.5px]"}>
      <Skeleton className="w-full aspect-[242/354]" />
    </div>
  );
}

export function VideoList({ 
  videos = [], 
  droppableId, 
  title, 
  emptyState, 
  isContentPanel,
  isLoading
}: VideoListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(isContentPanel ? "grid" : "stack");
  const isPlaylist = droppableId === "playlist";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h2 className="font-semibold text-primary">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">
            {videos.length} videos
          </span>
          <div className="flex gap-1">
            {isPlaylist ? (
              <Button
                variant={viewMode === "stack" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("stack")}
                className="h-8 w-8"
                title="Stack view"
              >
                <StackViewIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
                title="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
              title="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isContentPanel && (
        <div className="border-b border-border/50">
          <div className="p-4 space-y-4">
            <Tabs defaultValue="your-content" className="w-full">
              <TabsList className="bg-muted">
                <TabsTrigger value="your-content">Your content</TabsTrigger>
                <TabsTrigger value="skillstone">Skillstone</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search content..." />
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <Droppable 
          droppableId={droppableId} 
          direction="vertical"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "relative p-4 min-h-[600px]",
                viewMode === "grid" && "video-grid",
                viewMode === "list" && "flex flex-col gap-2",
                viewMode === "stack" && "flex flex-col items-center gap-4"
              )}
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <VideoSkeleton key={index} viewMode={viewMode} />
                ))
              ) : videos.length > 0 ? (
                <>
                  {videos.map((video, index) => (
                    <Draggable key={video.id} draggableId={video.id} index={index}>
                      {(provided, snapshot) => (
                        viewMode === "stack" ? (
                          <div className="w-[242px]">
                            <VideoCard
                              video={video}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          </div>
                        ) : viewMode === "grid" ? (
                          <VideoCard
                            video={video}
                            provided={provided}
                            snapshot={snapshot}
                            isSmall={isContentPanel}
                          />
                        ) : (
                          <VideoRow
                            video={video}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  {emptyState}
                </div>
              )}
            </div>
          )}
        </Droppable>
      </ScrollArea>
    </div>
  );
}