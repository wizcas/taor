import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import classNames from 'classnames';
import styles from './Button.module.css';
import { getVariantClass, Variants } from '@/types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconSize?: string;
  variant?: Variants;
}

export default function Button({
  children,
  type = 'button',
  variant = 'normal',
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={classNames(styles.button, getVariantClass(variant))}
      {...rest}
    >
      {children}
    </button>
  );
}
