import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageError.module.css';
import classNames from 'classnames';

export function ImageError(props) {
  const { hasError, dark, message } = props;
  return (
    <>
      {hasError && (
        <div
          className={classNames(styles.wrapper, {
            [styles.dark]: dark,
          })}
        >
          <FontAwesomeIcon icon={faSlash} />
          {message && <span>{message}</span>}
        </div>
      )}
    </>
  );
}
