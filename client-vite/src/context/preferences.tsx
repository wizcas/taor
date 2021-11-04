import React, { createContext, PropsWithChildren } from 'react';
import { makeAutoObservable, reaction } from 'mobx';

const defaultWallpaper =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

class Preferences {
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

export const PreferencesContext = createContext<Preferences>(new Preferences());

export function PreferencesWrapper({ children }: PropsWithChildren<unknown>) {
  const preferences = new Preferences();
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}
