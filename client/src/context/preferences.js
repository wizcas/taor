import { createContext } from 'react';
import { useStoredContext } from '../hooks/useStoredContext';

export const defaultPreferences = {
  wallpaper:
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
};

export const PreferencesContext = createContext();

export function PreferencesWrapper(props) {
  const { children } = props;
  const ctx = useStoredContext('preferences', defaultPreferences);
  return (
    <PreferencesContext.Provider value={ctx}>
      {children}
    </PreferencesContext.Provider>
  );
}
