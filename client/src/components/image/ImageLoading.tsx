import classNames from 'classnames';
import Spinner from '../spinner/Spinner';
import styles from './ImageLoading.module.css';

interface Props {
  loading?: boolean;
  dark?: boolean;
}
export default function ImageLoading(props: Props) {
  const { loading, dark } = props;
  return loading ? (
    <div
      className={classNames(styles.wrapper, {
        [styles.dark]: dark,
      })}
    >
      <Spinner size={50} dark={dark} loading={loading} />
    </div>
  ) : (
    <></>
  );
}
