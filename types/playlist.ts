// types/playlist.ts

export type BaseComponent = {
  id: number;
  __component: string;
  title?: string;
  description?: string;
  label_text?: string;
  label_colour?: string;
};

export interface ImageData {
  attributes: {
    url: string;
    name?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
  }
}

export interface ImageSource {
  data: ImageData;
}


export type VideoComponent = BaseComponent & {
  __component: 'playlist-components.video';
  video?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
};

export interface CompanyCardComponent extends BaseComponent {
  __component: 'playlist-components.company-card';
  label_text: string;
  label_colour: string;
  image_source?: ImageSource;
}

export type ImageCardComponent = BaseComponent & {
  __component: 'playlist-components.image-card';
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
};

export type LinkCardComponent = BaseComponent & {
  __component: 'playlist-components.link-card';
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
  cta_text?: string;
  background_colour?: string;
  text_colour?: string;
};

export type SectionCardComponent = BaseComponent & {
  __component: 'playlist-components.section-card';
};

export type SubSectionCardComponent = BaseComponent & {
  __component: 'playlist-components.sub-section-card';
  number?: number;
};

export type InputField = {
  label: string;
  is_required: boolean;
  placeholder?: string;
};

export type InputCardComponent = BaseComponent & {
  __component: 'playlist-components.input-card';
  input_fields?: InputField[];
};

export type PlaylistComponent =
  | VideoComponent
  | CompanyCardComponent
  | ImageCardComponent
  | LinkCardComponent
  | SectionCardComponent
  | SubSectionCardComponent
  | InputCardComponent;

export type Playlist = {
  id: number;
  attributes: {
    title: string;
    description?: string;
    Components: PlaylistComponent[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};