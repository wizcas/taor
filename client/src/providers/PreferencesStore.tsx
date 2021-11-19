import { makeAutoObservable, reaction } from 'mobx';
import { createContext } from 'react';
import { ProvidableContext } from './ContextProvider';

const defaultWallpaper =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

class PreferencesStore {
  wallpaperUrl = defaultWallpaper;

  constructor() {
    this.wallpaperUrl = localStorage.getItem('wallpaper') || defaultWallpaper;
    makeAutoObservable(this);
    reaction(
      () => this.wallpaperUrl,
      (wallpaper) => {
        localStorage.setItem('wallpaper', wallpaper);
      }
    );
  }
}

export const PreferencesContext = createContext<PreferencesStore>(
  new PreferencesStore()
);

export const PREFERENCES_PROVIDER: ProvidableContext<PreferencesStore> = {
  context: PreferencesContext,
  initialValue: () => new PreferencesStore(),
};
