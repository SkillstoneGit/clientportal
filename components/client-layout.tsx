"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Toaster } from "@/components/ui/toaster";
import { SideNav } from '@/components/side-nav';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <div className="fixed bottom-4 left-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}