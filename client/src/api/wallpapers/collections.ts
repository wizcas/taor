import { useRef } from 'react';
import WALLPAPER_DB from './db';
import { ImageMetadata } from '@/types';

const PAGE_SIZE = 32;

export interface Collection {
  id: number;
  name: string;
  images: ImageMetadata[];
}

class CollectionsApi {
  private get table() {
    return WALLPAPER_DB.table<Collection, number>('collections');
  }

  async list(page = 0): Promise<Collection[]> {
    try {
      return this.table
        .offset(page * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .toArray();
    } catch (e) {
      console.error('Error listing collections', e);
      return [];
    }
  }

  async upsert(collection: Collection) {
    try {
      await this.table.put(collection, collection.id);
    } catch (e) {
      console.error('Error upserting collection', e);
    }
  }

  async delete(collection: Collection) {
    try {
      await this.table.delete(collection.id);
    } catch (e) {
      console.error('Error deleting collection', e);
    }
  }
}

export function useCollectionsApi() {
  const ref = useRef(new CollectionsApi());
  return ref.current;
}
