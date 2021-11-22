import classNames from 'classnames';
import type { Size } from '@/types';
import { Variants, getVariantClass } from '@/types';

interface Props {
  text: string;
  size?: Size;
  type?: Variants;
  className?: string;
}

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
        getVariantClass(type),
        SIZE_CLASSES[size],
        className
      )}
    >
      {text}
    </span>
  );
}
