import { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import styles from './Wallpaper.module.css';
import { WallpaperContext } from '@/providers';

export default observer(function Wallpaper() {
  const wallpaper = useContext(WallpaperContext);
  const url = wallpaper.active?.value as string | '';
  const [top, setTop] = useState(0);
  const layers = useRef<string[]>([url]);
  useEffect(() => {
    if (!url) return;
    const nextImg = new Image();
    nextImg.onload = () => {
      const nextTop = top === 0 ? 1 : 0;
      layers.current[nextTop] = url;
      setTop(() => nextTop);
    };
    nextImg.src = url;
  }, [url]);
  return (
    <div>
      <img
        alt=""
        className={classNames(styles.wallpaper, {
          [styles.top]: top === 0,
        })}
        src={layers.current[0]}
      />
      <img
        alt=""
        className={classNames(styles.wallpaper, {
          [styles.top]: top === 1,
        })}
        src={layers.current[1]}
      />
    </div>
  );
});
