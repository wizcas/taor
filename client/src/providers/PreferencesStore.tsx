import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { ProvidableContext } from './ContextProvider';
import { Collection, CollectionsApi } from '@/api/wallpapers/collections';

const defaultWallpaper =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

class PreferencesStore {
  private _activeWallpaper: IPromiseBasedObservable<string> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeWallpaper() {
    if (!this._activeWallpaper) {
      this._activeWallpaper = fromPromise<string>(this.getActiveWallpaper());
    }
    return this._activeWallpaper;
  }

  selectWallpaper(value: string) {
    localStorage.setItem('wallpaper', value);
    this.refetchActiveWallpaper();
  }

  selectCollection(collection: Collection | null) {
    if (!collection) return;
    const { id, images } = collection;
    if (id === undefined) {
      console.error('trying to set a no-ID collection');
      return;
    }
    localStorage.setItem('collectionId', id.toString(10));
    if (images.length > 0) {
      this.refetchActiveWallpaper();
    }
  }

  private refetchActiveWallpaper() {
    this._activeWallpaper = null;
  }

  private async getActiveWallpaper() {
    let wallpaper = await this.getCollectionWallpaper();
    if (!wallpaper) {
      wallpaper = await this.getFixedWallpaper();
    }
    return wallpaper || defaultWallpaper;
  }

  private async getCollectionWallpaper() {
    const id = parseInt(localStorage.getItem('collectionId') || '', 10);
    if (Number.isNaN(id)) return null;
    const collection = await new CollectionsApi().get(id);
    if (!collection) return null;
    return collection.images[0].raw || null;
  }

  private async getFixedWallpaper() {
    return localStorage.getItem('wallpaper') || defaultWallpaper;
  }
}

export const PreferencesContext = createContext<PreferencesStore>(
  new PreferencesStore()
);
PreferencesContext.displayName = 'PreferencesContext';

export const PREFERENCES_PROVIDER: ProvidableContext<PreferencesStore> = {
  context: PreferencesContext,
  initialValue: () => new PreferencesStore(),
};
