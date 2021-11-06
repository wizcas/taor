import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PreferencesContext } from 'src/context/preferences';
import styles from './Wallpaper.module.css';

function Wallpaper() {
  const preferences = useContext(PreferencesContext);
  return (
    <img className={styles.wallpaper} alt="" src={preferences.wallpaperUrl} />
  );
}

const ObservedWallpaper = observer(Wallpaper);
export default ObservedWallpaper;
