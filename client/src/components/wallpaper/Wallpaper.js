import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PreferencesContext } from '../../context/preferences';
import styles from './Wallpaper.module.css';

function Component() {
  const preferences = useContext(PreferencesContext);
  return (
    <img className={styles.wallpaper} alt="" src={preferences.wallpaper} />
  );
}

export const Wallpaper = observer(Component);
