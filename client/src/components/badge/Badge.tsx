import classNames from 'classnames';
import type { Size } from '@/types';

export type ColorTypes =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

interface Props {
  text: string;
  size?: Size;
  type?: ColorTypes;
  className?: string;
}

const COLOR_CLASSES: Record<ColorTypes, string> = {
  primary: 'bg-primary-400 text-dark-500',
  secondary: 'bg-gray-300 text-dark-500',
  info: 'bg-blue-500 text-light-500',
  success: 'bg-green-400 text-dark-500',
  warning: 'bg-yellow-400 text-dark-500',
  danger: 'bg-red-500 text-dark-500',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-md px-4 py-1',
};

export default function Badge({
  text,
  size = 'sm',
  type = 'primary',
  className,
}: Props) {
  return (
    <span
      className={classNames(
        'rounded-sm font-bold',
        COLOR_CLASSES[type],
        SIZE_CLASSES[size],
        className
      )}
    >
      {text}
    </span>
  );
}
