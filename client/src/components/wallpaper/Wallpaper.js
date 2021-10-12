import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PreferencesContext } from '../../context/preferences';
import styles from './Wallpaper.module.css';

function Component() {
  const preferences = useContext(PreferencesContext);
  const style = {
    '--wallpaper': `url(${preferences.wallpaper})`,
  };
  return <div className={styles.wallpaper} style={style}></div>;
}

export const Wallpaper = observer(Component);
