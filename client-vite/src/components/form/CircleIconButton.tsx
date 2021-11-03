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
  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        `bg-${color}`,
        `border-${color}`,
        `w-${size}`,
        `h-${size}`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
