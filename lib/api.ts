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
        'populate[Components][populate]': '*',
        'populate[Components][populate][image][populate]': '*',
        'populate[Components][populate][video][populate]': '*'
      }
    });

    if (!API_TOKEN) {
      // Return dummy data if no token is available
      return [
        {
          id: 1,
          attributes: {
            title: 'Design Fundamentals',
            description: 'Learn the basics of design',
            Components: [
              {
                id: 1,
                __component: 'playlist-components.video-component',
                title: 'Introduction to Design',
                description: 'Learn the basics of design thinking',
                label_text: 'INTRODUCTION',
                label_colour: '#4CAF50',
                video: {
                  data: {
                    attributes: {
                      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    }
                  }
                }
              },
              {
                id: 2,
                __component: 'playlist-components.section-card-component',
                title: 'Design Principles',
                description: 'Understanding core design concepts',
                label_text: 'CHAPTER'
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
            title: 'UX Research',
            description: 'Master user research methods',
            Components: [],
            createdAt: '2024-01-02T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
            publishedAt: '2024-01-02T00:00:00.000Z'
          }
        }
      ];
    }

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiRequestError(
        error.response?.data?.error?.message || 'Failed to fetch playlists',
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