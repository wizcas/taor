import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './CircleIconButton.module.css';

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
  size?: string;
}

type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CircleIconButton(props: ButtonProps) {
  const { children, color = 'white', className, size, ...rest } = props;
  const style = {
    '--color': color,
  } as React.CSSProperties;
  return (
    <button
      type="button"
      className={classNames(styles.button, `w-${size}`, `h-${size}`, className)}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
