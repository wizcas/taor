import * as feather from 'feather-icons';

interface Props {
  icon: string;
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  size?: number | string;
  strokeWidth?: number;
  strokeLineCap?: string;
  strokeLineJoin?: string;
}

export default function FeatherIcon({
  icon,
  className,
  color = 'currentColor',
  width,
  height,
  size,
  strokeWidth,
  strokeLineCap,
  strokeLineJoin,
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
    attrs.width = size;
    attrs.height = size;
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
  const html = feather.icons[icon].toSvg(attrs);
  return (
    <div
      className="flex justify-center items-center"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
