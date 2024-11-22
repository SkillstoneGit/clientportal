"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VideoComponent } from "@/components/cards/video-component";
import { WelcomeCard } from "@/components/cards/welcome-card";
import { CompanyCard } from "@/components/cards/company-card";
import { FormCard } from "@/components/cards/form-card";
import { ImageCard } from "@/components/cards/image-card";
import { LinkCard } from "@/components/cards/link-card";
import { SectionCard } from "@/components/cards/section-card";
import { SubSectionCard } from "@/components/cards/sub-section-card";

const formFields = [
  { label: "Name", type: "text", required: true },
  { label: "Email", type: "email", required: true },
  { label: "Message", type: "textarea" }
];

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-primary">Components</h1>
        <Button className="bg-[#B77BF3] hover:bg-[#B77BF3]/90 gap-2">
          <Plus className="h-4 w-4" />
          New Component
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <WelcomeCard 
          name="Hydro Tasmania" 
          logo="/hydro-tasmania-logo.png"
        />

        {/* Video Component Card */}
        <VideoComponent
          title="The dream office space to relax and unwind after a hard day"
          description="Sally Robinson takes you on a interior design masterclass to help your productivity."
          label="INTRODUCTION"
          labelColor="#4CAF50"
        />

        {/* Company Card */}
        <CompanyCard
          imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
          label="COMPANY"
          labelColor="#2196F3"
        />

        {/* Form Card */}
        <FormCard
          title="Contact Information"
          label="FORM"
          labelColor="#9C27B0"
          fields={formFields}
        />

        {/* Image Card */}
        <ImageCard
          imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
          title="Team Collaboration"
          description="Learn how to work effectively in teams"
          label="GUIDE"
          labelColor="#FF9800"
        />

        {/* Link Card */}
        <LinkCard
          title="Getting Started Guide"
          description="Everything you need to know to get up and running"
          imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
          label="TUTORIAL"
          labelColor="#E91E63"
          progress={65}
        />

        {/* Section Card */}
        <div className="bg-secondary/50 rounded-lg">
          <SectionCard
            label="CHAPTER"
            title="Introduction to Design"
            description="Learn the fundamentals of design thinking"
          />
        </div>

        {/* Sub Section Card */}
        <div className="bg-secondary/50 rounded-lg">
          <SubSectionCard
            number={1}
            title="Understanding User Needs"
          />
        </div>

        {/* Empty state card */}
        <Card className="aspect-[382/264] flex flex-col items-center justify-center border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Create a new component</p>
        </Card>
      </div>
    </div>
  );
}