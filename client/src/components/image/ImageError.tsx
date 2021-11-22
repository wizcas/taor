import classNames from 'classnames';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './ImageError.module.css';

interface Props {
  hasError?: boolean;
  dark?: boolean;
  message?: string;
}
export default function ImageError(props: Props) {
  const { hasError, dark, message } = props;
  return (
    <>
      {hasError && (
        <div
          className={classNames(styles.wrapper, {
            [styles.dark]: dark,
          })}
        >
          <FeatherIcon icon="slash" />
          {message && <span>{message}</span>}
        </div>
      )}
    </>
  );
}
