import { CSSProperties, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import styles from './CircleButton.module.css';

type Sizes = 'sm' | 'md' | 'lg';

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
  size?: Sizes;
}

type SizedClassMap = Record<Sizes, string>;

const paddingMap: SizedClassMap = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

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
      className={classNames(styles.button, paddingMap[size], className)}
      {...rest}
      style={style}
    >
      <div className={styles.background} />
      {children}
    </button>
  );
}
