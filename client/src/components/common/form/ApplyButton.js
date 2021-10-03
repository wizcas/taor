import classNames from 'classnames';
import styles from './ApplyButton.module.css';

export function ApplyButton(props) {
  const { children, className, ...rest } = props;
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
