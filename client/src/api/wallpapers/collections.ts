import cloneDeep from 'lodash/cloneDeep';
import WALLPAPER_DB from './db';
import { ImageMetadata } from '@/types';

export interface Collection {
  id?: number;
  name: string;
  images: ImageMetadata[];
}

export class CollectionsApi {
  private get table() {
    return WALLPAPER_DB.table<Collection, number>('collections');
  }

  async list(offset: number, limit: number): Promise<Collection[]> {
    try {
      return this.table.offset(offset).limit(limit).toArray();
    } catch (e) {
      console.error('Error listing collections', e);
      return [];
    }
  }

  async upsert(collection: Collection) {
    try {
      const newId = await this.table.put(collection, collection.id);
      const result = cloneDeep(collection);
      result.id = newId;
      return result;
    } catch (e) {
      console.error('Error upserting collection', e);
      return null;
    }
  }

  async delete(collection: Collection) {
    try {
      if (collection.id === undefined) return;
      await this.table.delete(collection.id);
    } catch (e) {
      console.error('Error deleting collection', e);
    }
  }
}
