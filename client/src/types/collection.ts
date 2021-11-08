import { ImageMetadata } from './image';

export interface Collection {
  name: string;
  images: ImageMetadata[];
}
