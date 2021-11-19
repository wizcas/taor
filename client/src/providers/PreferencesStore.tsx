import { createContext, PropsWithChildren } from 'react';
import { makeAutoObservable, reaction } from 'mobx';

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

export function PreferencesProvider({ children }: PropsWithChildren<unknown>) {
  const preferences = new PreferencesStore();
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}
