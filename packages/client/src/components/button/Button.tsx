import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import classNames from 'classnames';
import FeatherIcon, { IconSizes } from '../icon/FeatherIcon';
import styles from './Button.module.css';
import { getVariantClass, Variants } from '@/types';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Omit<BaseButtonProps, 'type'> {
  icon?: string;
  iconSize?: IconSizes;
  variant?: Variants;
  type?: BaseButtonProps['type'];
}

export default function Button({
  children,
  icon,
  iconSize,
  type = 'button',
  variant = 'normal',
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={classNames(
        styles.button,
        getVariantClass(variant, { hover: true, active: true })
      )}
      {...rest}
    >
      {icon && <FeatherIcon icon={icon} size={iconSize} />}
      {children}
    </button>
  );
}
