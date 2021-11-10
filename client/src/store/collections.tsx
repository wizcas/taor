import { createContext, PropsWithChildren } from 'react';
import Dexie from 'dexie';
import { Collection } from '@/types';

const PAGE_SIZE = 32;

const wallpaperDb = new Dexie('WallpaperDatabase');
wallpaperDb.version(1).stores({
  collections: '++id, name, images',
});

class Collections {
  private get table() {
    return wallpaperDb.table<Collection, number>('collections');
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

export const CollectionsContext = createContext<Collections>(new Collections());

export function CollectionsProvider({ children }: PropsWithChildren<unknown>) {
  const preferences = new Collections();
  return (
    <CollectionsContext.Provider value={preferences}>
      {children}
    </CollectionsContext.Provider>
  );
}
