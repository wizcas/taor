import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { ProvidableContext } from './ContextProvider';
import type { ModalRef } from '@/types';
import { Collection, CollectionsApi } from '@/api/wallpapers/collections';

const PAGE_SIZE = 24;

class CollectionsStore {
  list: Collection[] = [];

  offset = 0;

  creationModal?: ModalRef = undefined;

  private readonly api = new CollectionsApi();

  constructor() {
    makeAutoObservable(this);
  }

  async loadMore() {
    const result = await this.api.list(this.offset, PAGE_SIZE);
    this.offset += PAGE_SIZE;
    this.list.push(...result);
  }

  async create(collection: Collection) {
    if (collection.id !== undefined) {
      console.warn('removing the assgined collection ID');
      delete collection.id;
    }
    const newOne = await this.api.upsert(collection);
    if (newOne) {
      this.list.push(newOne);
    }
  }

  async rename(collection: Collection, newName: string) {
    if (collection.id === undefined) return;
    collection.name = newName;
    await this.api.upsert(collection);
  }

  async delete(collection: Collection) {
    await this.api.delete(collection);
  }
}

export const CollectionsContext = createContext<CollectionsStore>(
  new CollectionsStore()
);

export const COLLECTIONS_PROVIDER: ProvidableContext<CollectionsStore> = {
  context: CollectionsContext,
  initialValue: () => new CollectionsStore(),
};
