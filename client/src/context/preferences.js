import { createContext } from 'react';
import { makeAutoObservable, reaction } from 'mobx';

const defaultWallpaper = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

class Preferences {
  wallpaper;

  constructor() {
    this.wallpaper = localStorage.getItem('wallpaper') || defaultWallpaper;
    makeAutoObservable(this);
    reaction(
      () => this.wallpaper,
      (wallpaper) => {
        console.log('wallpaper stored', wallpaper);
        localStorage.setItem('wallpaper', wallpaper);
      },
    );
  }
}

export const PreferencesContext = createContext();

export function PreferencesWrapper({ children }) {
  const preferences = new Preferences();
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}
