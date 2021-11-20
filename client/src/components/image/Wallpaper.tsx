import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Wallpaper.module.css';
import { WallpaperContext } from '@/providers';

export default observer(function Wallpaper() {
  const wallpaper = useContext(WallpaperContext);
  return (
    <img
      className={styles.wallpaper}
      alt=""
      src={`${wallpaper.active?.value}`}
    />
  );
});
