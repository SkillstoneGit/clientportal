export interface PlaylistComponent {
  id: number;
  __component: string;
  label_text?: string;
  label_colour?: string;
  title?: string;
  description?: string;
  number?: number;
  cta_text?: string;
  background_colour?: string;
  text_colour?: string;
  has_contract?: boolean;
  input_fields?: Array<{
    id: number;
    label: string;
    is_required: boolean;
    placeholder?: string;
  }>;
  image?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  video?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  sequence?: {
    data?: {
      id: number;
    };
  };
  watched_log?: {
    data: Array<{
      id: number;
      attributes: {
        username: string;
      };
    }>;
  };
}

export interface Playlist {
  id: number;
  attributes: {
    title: string;
    description?: string;
    Components?: PlaylistComponent[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}