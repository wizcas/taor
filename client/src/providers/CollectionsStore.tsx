import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import unionWith from 'lodash/fp/unionWith';
import { ProvidableContext } from './ContextProvider';
import type { ImageMetadata, ModalRef } from '@/types';
import {
  Collection,
  CollectionsApi,
  isImageInCollection,
} from '@/api/wallpapers/collections';

const PAGE_SIZE = 24;
const unionCollections = unionWith<Collection>((c1, c2) => c1.id === c2.id);

export type CollectionsBrowserMode = 'browse' | 'addTo';

export interface CollectionsBrowserArgs {
  canCreate?: boolean;
  mode?: CollectionsBrowserMode;
}

class CollectionsStore {
  offset = 0;

  isLoading = false;

  addingImage?: ImageMetadata;

  private _list: Collection[] = [];

  private browserModal?: ModalRef<CollectionsBrowserArgs> = undefined;

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
    const { list } = this;
    const pendings = upsertedItems.map((item) => {
      const index = list.findIndex((c) => c.id === item.id);
      return { item, index };
    });
    // replace the updated items
    pendings
      .filter(({ index }) => index > -1)
      .forEach(({ item, index }) => {
        list.splice(index, 1, item);
      });
    // prepend the new items
    this.list = unionCollections(
      pendings.filter(({ index }) => index < 0).map(({ item }) => item),
      list
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

  async addImageToCollection(collection: Collection) {
    if (!this.addingImage) return;
    if (isImageInCollection(this.addingImage, collection)) return;
    collection.images = [...collection.images, this.addingImage];
    const updated = await this.api.upsert(collection);
    if (updated) {
      this.upsertList([updated]);
    }
  }

  async rename(collection: Collection, newName: string) {
    if (collection.id === undefined) return;
    collection.name = newName;
    const updated = await this.api.upsert(collection);
    if (updated) {
      this.upsertList([updated]);
    }
  }

  async delete(collection: Collection) {
    await this.api.delete(collection);
    this.list = this.list.filter((existed) => existed.id !== collection.id);
  }

  hasImageIn(collection: Collection) {
    return (
      this.addingImage && isImageInCollection(this.addingImage, collection)
    );
  }

  initBrowser(modal: ModalRef<CollectionsBrowserArgs>) {
    this.browserModal = modal;
  }

  openBrowser(args: CollectionsBrowserArgs, addingImage?: ImageMetadata) {
    this.addingImage = addingImage;
    this.browserModal?.open(args);
  }

  closeBrowser() {
    this.addingImage = undefined;
    this.browserModal?.close();
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
