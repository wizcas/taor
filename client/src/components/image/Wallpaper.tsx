import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Wallpaper.module.css';
import { PreferencesContext } from '@/providers/PreferencesStore';

export default observer(function Wallpaper() {
  const preferences = useContext(PreferencesContext);
  return (
    <img
      className={styles.wallpaper}
      alt=""
      src={(preferences.activeWallpaper.value as string) || ''}
    />
  );
});
