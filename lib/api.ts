"use client";

import axios, { AxiosError } from 'axios';
import type { Video } from '@/types/video';
import type { Playlist } from '@/types/playlist';

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: {
      url?: string;
      response?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

const BASE_URL = 'https://api-staging.skillstone.com';

// This should be loaded from environment variables
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed. Please check your API token.');
    }
    return Promise.reject(error);
  }
);

export async function createPlaylist(name: string, videoIds: string[]): Promise<any> {
  try {
    const response = await api.post('/playlists', {
      data: {
        title: name,
        // Assuming the API expects components in this format for videos
        Components: videoIds.map(videoId => ({
          __component: 'playlist-components.video-component',
          video: {
            connect: [{ id: videoId }]
          }
        }))
      }
    });

    if (!API_TOKEN) {
      // Return dummy response if no token is available
      return {
        data: {
          id: Math.random().toString(),
          attributes: {
            title: name,
            Components: videoIds.map(videoId => ({
              id: Math.random().toString(),
              __component: 'playlist-components.video-component',
              video: {
                data: {
                  id: videoId
                }
              }
            }))
          }
        }
      };
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiRequestError(
        error.response?.data?.error?.message || 'Failed to create playlist',
        error.response?.status || 500,
        {
          url: error.config?.url,
          response: error.response?.data
        }
      );
    }
    throw error;
  }
}

export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await api.get('/upload/files', {
      params: {
        'filters[mime][$contains]': 'video',
        'pagination[page]': 1,
        'pagination[pageSize]': 25,
        'sort': 'createdAt:desc'
      }
    });

    if (!API_TOKEN) {
      // Return dummy data if no token is available
      return [
        {
          id: '1',
          title: 'Introduction to Design',
          description: 'Learn the basics of design thinking',
          duration: '5:20',
          videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          label: 'INTRODUCTION'
        },
        {
          id: '2',
          title: 'User Research Methods',
          description: 'Understanding user needs and behaviors',
          duration: '8:15',
          videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          label: 'RESEARCH'
        },
        {
          id: '3',
          title: 'Prototyping Techniques',
          description: 'Creating effective prototypes',
          duration: '6:45',
          videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          label: 'DESIGN'
        }
      ];
    }

    return response.data.map((file: any) => ({
      id: file.id.toString(),
      title: file.name,
      duration: '0:00',
      videoUrl: file.url
    }));
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiRequestError(
        error.response?.data?.error?.message || 'Failed to fetch videos',
        error.response?.status || 500,
        {
          url: error.config?.url,
          response: error.response?.data
        }
      );
    }
    throw error;
  }
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  try {
    const response = await api.get('/playlists', {
      params: {
        populate: {
          Components: {
            populate: {
              '*': true,
              image_source: {
                populate: ['data', 'data.attributes']
              },
              video: {
                populate: '*'
              },
              input_fields: {
                populate: '*'
              }
            }
          }
        }
      }
    });

    if (!API_TOKEN) {
      // Return dummy data if no token is available
      return [
        {
          id: 1,
          attributes: {
            title: 'Example Playlist',
            description: 'A demonstration playlist',
            Components: [
              {
                id: 1,
                __component: 'playlist-components.company-card',
                label_text: 'Company',
                label_colour: '#4CAF50',
                image_source: {
                  data: {
                    attributes: {
                      url: 'https://placehold.co/600x400',
                      name: 'Example Company Image',
                      alternativeText: 'Company Logo',
                      width: 600,
                      height: 400,
                      formats: {},
                      hash: 'example_hash',
                      ext: '.jpg',
                      mime: 'image/jpeg',
                      size: 54.32
                    }
                  }
                }
              },
              {
                id: 2,
                __component: 'playlist-components.video',
                title: 'Introduction Video',
                description: 'Welcome to our platform',
                label_text: 'INTRO',
                label_colour: '#2196F3',
                video: {
                  data: {
                    attributes: {
                      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    }
                  }
                }
              },
              {
                id: 3,
                __component: 'playlist-components.section-card',
                title: 'Getting Started',
                description: 'Learn the basics',
                label_text: 'SECTION'
              },
              {
                id: 4,
                __component: 'playlist-components.input-card',
                title: 'User Information',
                description: 'Please provide your details',
                label_text: 'FORM',
                label_colour: '#9C27B0',
                input_fields: [
                  {
                    label: 'Full Name',
                    is_required: true,
                    placeholder: 'Enter your full name'
                  },
                  {
                    label: 'Email',
                    is_required: true,
                    placeholder: 'Enter your email'
                  }
                ]
              },
              {
                id: 5,
                __component: 'playlist-components.link-card',
                title: 'Additional Resources',
                description: 'Check out these helpful links',
                label_text: 'RESOURCES',
                label_colour: '#FF9800',
                cta_text: 'Learn More',
                background_colour: '#FFF3E0',
                text_colour: '#E65100'
              }
            ],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            publishedAt: '2024-01-01T00:00:00.000Z'
          }
        },
        {
          id: 2,
          attributes: {
            title: 'Another Playlist',
            description: 'More example content',
            Components: [],
            createdAt: '2024-01-02T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
            publishedAt: '2024-01-02T00:00:00.000Z'
          }
        }
      ];
    }

    if (!response.data || !response.data.data) {
      throw new ApiRequestError(
        'Invalid response format from server',
        500,
        {
          url: '/playlists',
          response: response.data
        }
      );
    }

    console.log('DATA::: ', response.data.data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      let errorMessage = 'Failed to fetch playlists';
      if (error.response?.status === 500) {
        errorMessage = 'Internal server error while fetching playlists';
      } else if (error.response?.status === 404) {
        errorMessage = 'Playlist endpoint not found';
      }

      console.error('Full error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });

      throw new ApiRequestError(
        error.response?.data?.error?.message || errorMessage,
        error.response?.status || 500,
        {
          url: error.config?.url,
          response: error.response?.data
        }
      );
    }
    throw error;
  }
}