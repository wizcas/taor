export interface ImageMetadata {
  id: string;
  raw: string;
  thumbnail: string;
  width?: number;
  height?: number;
  primaryColor?: string;
}

export interface ImageListPagination {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface ImageList {
  images: ImageMetadata[];
  pagination: ImageListPagination;
}
