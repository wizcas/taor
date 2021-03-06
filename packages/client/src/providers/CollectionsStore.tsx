import { makeAutoObservable, runInAction } from 'mobx';
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

  pendingImage?: ImageMetadata;

  editingCollection?: Collection;

  private _list: Collection[] = [];

  private browserModal?: ModalRef<CollectionsBrowserArgs> = undefined;

  private editorModal?: ModalRef = undefined;

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
    runInAction(() => {
      this.isLoading = false;
    });
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
    if (!this.pendingImage) return;
    if (this.hasImageIn(collection)) return;
    collection.images = [...collection.images, this.pendingImage];
    const updated = await this.api.upsert(collection);
    if (updated) {
      this.upsertList([updated]);
    }
  }

  async deleteImageFromCollection(
    image: ImageMetadata,
    collection: Collection
  ) {
    if (!image) return;
    if (!isImageInCollection(image, collection)) return;
    collection.images = collection.images.filter(
      (collected) => collected.id !== image?.id
    );
    const updated = await this.api.upsert(collection);
    if (updated) {
      this.upsertList([updated]);
    }
  }

  async toggleImageInCollection(collection: Collection) {
    if (!this.pendingImage) return;
    if (this.hasImageIn(collection)) {
      await this.deleteImageFromCollection(this.pendingImage, collection);
    } else {
      await this.addImageToCollection(collection);
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
      this.pendingImage && isImageInCollection(this.pendingImage, collection)
    );
  }

  initBrowser(modal: ModalRef<CollectionsBrowserArgs>) {
    this.browserModal = modal;
  }

  disposeBrowser(modal: ModalRef<CollectionsBrowserArgs>) {
    if (this.browserModal === modal) {
      this.browserModal = undefined;
    }
  }

  openBrowser(args?: CollectionsBrowserArgs, addingImage?: ImageMetadata) {
    if (!this.browserModal) {
      console.warn('collection browser modal has not been initialized');
    }
    this.pendingImage = addingImage;
    this.browserModal?.open(args);
  }

  closeBrowser() {
    this.pendingImage = undefined;
    this.browserModal?.close();
  }

  initEditor(modal: ModalRef) {
    this.editorModal = modal;
  }

  disposeEditor(modal: ModalRef) {
    if (this.editorModal === modal) {
      this.editorModal = undefined;
    }
  }

  openEditor(collection: Collection) {
    if (!this.editorModal) {
      console.warn('collection editor modal has not been initialized');
    }
    this.editingCollection = collection;
    this.editorModal?.open();
  }

  closeEditor() {
    this.editingCollection = undefined;
    this.editorModal?.close();
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
