import classNames from 'classnames';
import { MoonLoader } from 'react-spinners';
import styles from './ImageLoading.module.css';

export function ImageLoading(props) {
  const { isLoading, dark } = props;
  return (
    isLoading && (
      <div
        className={classNames(styles.wrapper, {
          [styles.dark]: dark,
        })}
      >
        <MoonLoader
          size={50}
          color={dark ? 'white' : 'black'}
          loading={isLoading}
        />
      </div>
    )
  );
}
