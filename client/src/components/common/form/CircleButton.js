import classNames from 'classnames';
import styles from './CircleButton.module.css';

export function ApplyButton(props) {
  const {
    children, color = 'white', className, ...rest
  } = props;
  const style = {
    '--color': color,
  };
  return (
    <button
      className={classNames(styles.button, className)}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
