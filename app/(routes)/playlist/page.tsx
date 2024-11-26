"use client";

import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { VideoList } from "@/components/video-list";
import { CreatePlaylistDialog } from "@/components/create-playlist-dialog";
import { ErrorBoundary } from "@/components/error-boundary";
import { VideoComponent } from "@/components/cards/video-component";
import { CompanyCard } from "@/components/cards/company-card";
import { ImageCard } from "@/components/cards/image-card";
import { LinkCard } from "@/components/cards/link-card";
import { SectionCard } from "@/components/cards/section-card";
import { SubSectionCard } from "@/components/cards/sub-section-card";
import { FormCard } from "@/components/cards/form-card";
import type { Video } from "@/types/video";
import type { Playlist, PlaylistComponent, CompanyCardComponent } from "@/types/playlist";
import { fetchVideos, ApiRequestError } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { TopNav } from "@/components/top-nav";

export default function PlaylistPage() {
  const [availableVideos, setAvailableVideos] = useState<Video[]>([]);
  const [playlist, setPlaylist] = useState<Video[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchVideos();
        setAvailableVideos(videos);
      } catch (error) {
        let message = 'Failed to load videos. Please try again later.';
        if (error instanceof ApiRequestError) {
          message = error.message;
        }
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        console.error('Video loading error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [toast]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = source.droppableId === "available" ? availableVideos : playlist;
    const destList = destination.droppableId === "available" ? availableVideos : playlist;
    
    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, removed);

    if (source.droppableId === "available") {
      setAvailableVideos([...availableVideos]);
      setPlaylist([...playlist]);
    } else {
      setPlaylist([...playlist]);
      setAvailableVideos([...availableVideos]);
    }
  };

  const renderComponent = (component: PlaylistComponent) => {
    if (!component || !('__component' in component)) {
      console.warn('Invalid component:', component);
      return null;
    }
  
    const componentType = component.__component;
   
    console.log('Component raw data:', JSON.stringify(component, null, 2));
  
    switch (componentType) {
      case "playlist-components.video":
        return (
          <VideoComponent
            key={component.id}
            title={component.title || ""}
            description={component.description}
            videoUrl={component.video?.data?.attributes?.url}
            label={component.label_text}
            labelColor={component.label_colour}
          />
        );
      
        case "playlist-components.company-card": {
          const companyComponent = component as CompanyCardComponent;
          // Log all available image-related fields
          console.log('Company card fields:', {
            hasImage: 'image' in companyComponent,
            hasImageSource: 'image_source' in companyComponent,
            allKeys: Object.keys(companyComponent),
            component: companyComponent
          });
          
          // Temporarily modify to look for both image and image_source
          const imageData = companyComponent.image_source || (companyComponent as any).image;
          
          return (
            <CompanyCard
              key={component.id}
              image_source={component.image_source}
              label={component.label_text}
              labelColor={component.label_colour}
              className="bg-muted" // Add this to make it visible even without an image
            />
          );
        }
      
      case "playlist-components.image-card":
        return (
          <ImageCard
            key={component.id}
            imageUrl={component.image?.data?.attributes?.url || ""}
            title={component.title || ""}
            description={component.description}
            label={component.label_text}
            labelColor={component.label_colour}
          />
        );
      
      case "playlist-components.link-card":
        return (
          <LinkCard
            key={component.id}
            title={component.title || ""}
            description={component.description}
            imageUrl={component.image?.data?.attributes?.url}
            label={component.label_text}
            labelColor={component.label_colour}
            ctaText={component.cta_text}
            backgroundColor={component.background_colour}
            textColor={component.text_colour}
          />
        );
      
      case "playlist-components.section-card":
        return (
          <div key={component.id} className="bg-secondary/50 rounded-lg">
            <SectionCard
              label={component.label_text}
              title={component.title || ""}
              description={component.description}
            />
          </div>
        );
      
      case "playlist-components.sub-section-card":
        return (
          <div key={component.id} className="bg-secondary/50 rounded-lg">
            <SubSectionCard
              number={component.number || 0}
              title={component.title || ""}
            />
          </div>
        );
      
      case "playlist-components.input-card":
        return (
          <FormCard
            key={component.id}
            title={component.title || ""}
            description={component.description}
            label={component.label_text}
            labelColor={component.label_colour}
            fields={component.input_fields?.map(field => ({
              label: field.label,
              type: "text",
              required: field.is_required,
              placeholder: field.placeholder
            })) || []}
          />
        );
      
      default:
        console.warn(`Unknown component type: ${componentType}`);
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen">
        <TopNav onPlaylistSelect={setSelectedPlaylist} />
        <div className="flex-1 bg-background p-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg">
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-border/50">
                    <h2 className="font-semibold text-[#B77BF3]">Current Sequence</h2>
                  </div>
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {selectedPlaylist?.attributes?.Components?.map(renderComponent) || (
                      <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-primary/30">
                        <div className="text-center">
                          <h3 className="mt-2 text-sm font-semibold text-primary">
                            No playlist selected
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Select a playlist from the dropdown above
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle className="bg-border/50" />
              
              <ResizablePanel defaultSize={50}>
                <div className="h-full">
                  <VideoList
                    videos={availableVideos}
                    droppableId="available"
                    title="Available Content"
                    isContentPanel
                    isLoading={isLoading}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </DragDropContext>

          <CreatePlaylistDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            videos={playlist}
            onSuccess={() => {
              setPlaylist([]);
              toast({
                title: "Success",
                description: "Content published successfully!",
              });
            }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}