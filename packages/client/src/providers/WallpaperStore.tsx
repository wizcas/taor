import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import random from 'lodash/random';
import { ProvidableContext } from './ContextProvider';
import { Collection, CollectionsApi } from '@/api/wallpapers/collections';

const defaultWallpaper = '/packed/jam.jpg';

export type WallpaperMode = 'single' | 'collection';

class WallpaperStore {
  private _active: IPromiseBasedObservable<string> | null = null;

  private _collectionId = 0;

  private _mode: WallpaperMode | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get mode() {
    return (
      this._mode ||
      (localStorage.getItem('wallpaperMode') as WallpaperMode) ||
      'single'
    );
  }

  set mode(value: WallpaperMode) {
    this._mode = value;
    localStorage.setItem('wallpaperMode', value);
    this.reloadActive();
  }

  get active() {
    if (!this._active) {
      runInAction(() => {
        const lastActive = localStorage.getItem('activeWallpaper');
        this._active = fromPromise<string>(
          this.fetchActive(),
          fromPromise.resolve(lastActive || defaultWallpaper)
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

  async fromCollection() {
    const id = this.collectionId;
    if (id === null) return null;
    const collection = await new CollectionsApi().get(id);
    if (!collection) return null;
    if (collection.images.length === 0) return null;
    const rnd = random(collection.images.length - 1);
    return collection.images[rnd].raw || null;
  }

  fromSingle() {
    return localStorage.getItem('wallpaper') || defaultWallpaper;
  }

  private reloadActive() {
    this._active = null;
  }

  private async fetchActive() {
    let wallpaper: string | null;
    if (this.mode === 'collection') {
      wallpaper = await this.fromCollection();
    } else {
      wallpaper = this.fromSingle();
    }
    const active = wallpaper || defaultWallpaper;
    localStorage.setItem('activeWallpaper', active);
    return active;
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
