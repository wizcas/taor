import { CSSProperties, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import styles from './CircleButton.module.css';
import { Size, SIZED_PADDINGS } from '@/types';

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
  size?: Size;
}

type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CircleButton(props: ButtonProps) {
  const {
    children,
    color = 'currentColor',
    className,
    size = 'md',
    ...rest
  } = props;
  const style = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
      '--color': color,
    }),
    [size]
  );
  return (
    <button
      type="button"
      className={classNames(styles.button, SIZED_PADDINGS[size], className)}
      {...rest}
      style={style}
    >
      <div className={styles.background} />
      {children}
    </button>
  );
}
