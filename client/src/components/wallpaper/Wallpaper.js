import { useContext } from 'react';
import { PreferencesContext } from '../../context/preferences';
import styles from './Wallpaper.module.css';

export function Wallpaper() {
  const [preferences] = useContext(PreferencesContext);
  const style = {
    '--wallpaper': `url(${preferences.wallpaper})`,
  };
  return <div className={styles.wallpaper} style={style}></div>;
}
