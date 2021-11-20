import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { ProvidableContext } from './ContextProvider';
import { Collection, CollectionsApi } from '@/api/wallpapers/collections';

const defaultWallpaper =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

class WallpaperStore {
  private _active: IPromiseBasedObservable<string> | null = null;

  private _collectionId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get active() {
    if (!this._active) {
      runInAction(() => {
        this._active = fromPromise<string>(
          this.getActive(),
          fromPromise.resolve(defaultWallpaper)
        );
      });
    }
    return this._active;
  }

  get collectionId() {
    const id =
      this._collectionId ||
      parseInt(localStorage.getItem('collectionId') || '', 10);
    if (Number.isNaN(id)) return null;
    return id;
  }

  selectSingle(value: string) {
    localStorage.setItem('wallpaper', value);
    this.reloadActive();
  }

  selectCollection(collection: Collection | null) {
    if (!collection) return;
    const { id, images } = collection;
    if (id === undefined) {
      console.error('trying to set a no-ID collection');
      return;
    }
    localStorage.setItem('collectionId', id.toString(10));
    this._collectionId = id;
    if (images.length > 0) {
      this.reloadActive();
    }
  }

  private reloadActive() {
    this._active = null;
  }

  private async getActive() {
    let wallpaper = await this.fromCollection();
    if (!wallpaper) {
      wallpaper = await this.fromSingle();
    }
    return wallpaper || defaultWallpaper;
  }

  private async fromCollection() {
    const id = this.collectionId;
    if (id === null) return null;
    const collection = await new CollectionsApi().get(id);
    if (!collection) return null;
    return collection.images[0].raw || null;
  }

  private async fromSingle() {
    return localStorage.getItem('wallpaper') || defaultWallpaper;
  }
}

export const WallpaperContext = createContext<WallpaperStore>(
  new WallpaperStore()
);
WallpaperContext.displayName = 'WallpaperContext';

export const WALLPAPER_PROVIDER: ProvidableContext<WallpaperStore> = {
  context: WallpaperContext,
  initialValue: () => new WallpaperStore(),
};
