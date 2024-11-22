"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormField {
  label: string;
  type: string;
  required?: boolean;
}

interface FormCardProps {
  title: string;
  description?: string;
  label?: string;
  labelColor?: string;
  fields: FormField[];
  className?: string;
}

export function FormCard({
  title,
  description,
  label,
  labelColor = "#4CAF50",
  fields,
  className
}: FormCardProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComplete(true);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative p-6">
        {/* Label */}
        {label && (
          <div 
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white z-10"
            style={{ backgroundColor: labelColor }}
          >
            {label}
          </div>
        )}

        {/* Content */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">{title}</h3>
          {description && (
            <p className="text-muted-foreground mb-6">{description}</p>
          )}
          
          {isComplete ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">Form completed!</p>
              <Button 
                variant="outline"
                onClick={() => setIsComplete(false)}
              >
                Edit Response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.label} className="space-y-2">
                  <label className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={values[field.label] || ""}
                      onChange={(e) => 
                        setValues({ ...values, [field.label]: e.target.value })
                      }
                      className="w-full p-2 rounded-md bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-colors min-h-[100px]"
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={values[field.label] || ""}
                      onChange={(e) => 
                        setValues({ ...values, [field.label]: e.target.value })
                      }
                      className="w-full p-2 rounded-md bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-colors"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
}