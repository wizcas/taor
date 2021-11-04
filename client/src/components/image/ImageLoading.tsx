import classNames from 'classnames';
import { MoonLoader } from 'react-spinners';
import styles from './ImageLoading.module.css';

interface Props {
  isLoading?: boolean;
  dark?: boolean;
}
export default function ImageLoading(props: Props) {
  const { isLoading, dark } = props;
  return isLoading ? (
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
  ) : (
    <></>
  );
}
