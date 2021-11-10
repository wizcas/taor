import { ImageMetadata } from './image';

export interface Collection {
  id: number;
  name: string;
  images: ImageMetadata[];
}
