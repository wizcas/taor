import { Pagination } from './pagination';

export interface ImageMetadata {
  id: string;
  raw: string;
  thumbnail: string;
  width?: number;
  height?: number;
  primaryColor?: string;
}

export interface ImageList {
  images: ImageMetadata[];
  pagination: Pagination;
}
