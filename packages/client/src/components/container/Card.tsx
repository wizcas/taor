import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import styles from './Card.module.css';

export interface CardProps {
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  footer,
  className,
  onClick,
}: PropsWithChildren<CardProps>) {
  const interactive = !!onClick;
  const role = interactive ? 'button' : 'article';
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      role={role}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={() => undefined}
      className={classNames(
        styles.card,
        {
          [styles.interactive]: interactive,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
