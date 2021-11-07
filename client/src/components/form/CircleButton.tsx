import { CSSProperties, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import styles from './CircleButton.module.css';

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
  size?: string;
}

type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CircleButton(props: ButtonProps) {
  const { children, color = 'white', className, size, ...rest } = props;
  const style = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );
  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        `bg-${color}`,
        `border-${color}`,
        className
      )}
      {...rest}
      style={style}
    >
      {children}
    </button>
  );
}
