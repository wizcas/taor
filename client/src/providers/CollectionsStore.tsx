import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import unionWith from 'lodash/fp/unionWith';
import { ProvidableContext } from './ContextProvider';
import type { ModalRef } from '@/types';
import { Collection, CollectionsApi } from '@/api/wallpapers/collections';

const PAGE_SIZE = 24;
const unionCollections = unionWith<Collection>((c1, c2) => c1.id === c2.id);

export interface CollectionBrowserArgs {
  canCreate?: boolean;
}

class CollectionsStore {
  offset = 0;

  isLoading = false;

  browserModal?: ModalRef<CollectionBrowserArgs> = undefined;

  private _list: Collection[] = [];

  private readonly api = new CollectionsApi();

  constructor() {
    makeAutoObservable(this);
    this.loadMore();
  }

  get list() {
    return this._list.filter(Boolean);
  }

  set list(value) {
    this._list = value;
  }

  private upsertList(upsertedItems: Collection[]) {
    this.list = unionCollections(upsertedItems, this.list);
  }

  private deleteFromList(deletingItems: Collection[]) {
    this.list = this.list.filter(
      (collection) =>
        !deletingItems.some((excluded) => excluded.id === collection.id)
    );
  }

  async loadMore() {
    this.isLoading = true;
    const result = await this.api.list(this.offset, PAGE_SIZE);
    this.offset += PAGE_SIZE;
    this.upsertList(result);
    this.isLoading = false;
  }

  async create(collection: Collection) {
    if (collection.id !== undefined) {
      console.warn('removing the assgined collection ID');
      delete collection.id;
    }
    const newOne = await this.api.upsert(collection);
    if (newOne) {
      this.upsertList([newOne]);
    }
  }

  async rename(collection: Collection, newName: string) {
    if (collection.id === undefined) return;
    collection.name = newName;
    await this.api.upsert(collection);
  }

  async delete(collection: Collection) {
    await this.api.delete(collection);
    this.deleteFromList([collection]);
  }
}

export const CollectionsContext = createContext<CollectionsStore>(
  new CollectionsStore()
);
CollectionsContext.displayName = 'CollectionsContext';

export const COLLECTIONS_PROVIDER: ProvidableContext<CollectionsStore> = {
  context: CollectionsContext,
  initialValue: () => new CollectionsStore(),
};
