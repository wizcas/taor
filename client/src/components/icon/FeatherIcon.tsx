import * as feather from 'feather-icons';
import { Size, SizedStringValues } from '@/types';

export type IconSizes = Size | 'xl' | '2xl';

interface Props {
  icon: string;
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  size?: IconSizes;
  strokeWidth?: number;
  strokeLineCap?: string;
  strokeLineJoin?: string;
  fill?: string;
}

const SIZES: SizedStringValues<IconSizes> = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
};

export default function FeatherIcon({
  icon,
  className,
  color = 'currentColor',
  width,
  height,
  size = 'md',
  strokeWidth,
  strokeLineCap,
  strokeLineJoin,
  fill,
}: Props) {
  const attrs: Record<string, string | number> = {};
  if (className) {
    attrs.class = className;
  }
  if (color) {
    attrs.color = color;
  }
  if (width !== undefined) {
    attrs.width = width;
  }
  if (height !== undefined) {
    attrs.height = height;
  }
  if (size !== undefined) {
    const sizeValue = SIZES[size];
    attrs.width = sizeValue;
    attrs.height = sizeValue;
  }
  if (strokeWidth !== undefined) {
    attrs['stroke-width'] = strokeWidth;
  }
  if (strokeLineCap) {
    attrs['stroke-linecap'] = strokeLineCap;
  }
  if (strokeLineJoin) {
    attrs['stroke-linejoin'] = strokeLineJoin;
  }
  if (fill) {
    attrs.fill = fill;
  }

  const iconData = feather.icons[icon];
  if (!iconData) {
    console.error('Cannot find icon: ', icon);
    return <></>;
  }

  const html = feather.icons[icon].toSvg(attrs);
  return (
    <div
      className="flex justify-center items-center"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
