export interface Video {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl?: string;
  label?: string;
  progress?: number;
}