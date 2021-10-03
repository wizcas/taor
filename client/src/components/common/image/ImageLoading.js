import { MoonLoader } from 'react-spinners';
import styles from './ImageLoading.module.css';

export function ImageLoading(props) {
  const { isLoading } = props;
  return (
    isLoading && (
      <div className={styles.wrapper}>
        <MoonLoader size={50} color="#fff" loading={isLoading} />
      </div>
    )
  );
}
