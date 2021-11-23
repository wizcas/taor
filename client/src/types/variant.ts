import classNames from 'classnames';

export type Variants =
  | 'normal'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';
const VARIANT_CLASSES: Record<Variants, string> = {
  normal: 'bg-white-main bg-opacity-30 text-black-secondary',
  primary: 'bg-primary-400 text-black-secondary',
  secondary: 'bg-gray-300 text-black-secondary',
  info: 'bg-blue-500 text-white-main',
  success: 'bg-green-400 text-black-secondary',
  warning: 'bg-yellow-400 text-black-secondary',
  danger: 'bg-red-500 text-white-main',
};
const VARIANT_HOVER_CLASSES: Record<Variants, string> = {
  normal: 'hover:(bg-opacity-50)',
  primary: 'hover:(bg-primary-500)',
  secondary: 'hover:(bg-gray-400)',
  info: 'hover:(bg-blue-600)',
  success: 'hover:(bg-green-500)',
  warning: 'hover:(bg-yellow-500)',
  danger: 'hover:(bg-red-600) ',
};
const VARIANT_ACTIVE_CLASSES: Record<Variants, string> = {
  normal: 'active:(bg-white-secondary)',
  primary: 'active:(bg-primary-600)',
  secondary: 'active:(bg-gray-500)',
  info: 'active:(bg-blue-700)',
  success: 'active:(bg-green-600)',
  warning: 'active:(bg-yellow-600)',
  danger: 'active:(bg-red-700)',
};
export function getVariantClass(
  variant: Variants,
  { hover, active }: { hover?: boolean; active?: boolean } = {}
) {
  return classNames(VARIANT_CLASSES[variant], {
    [VARIANT_HOVER_CLASSES[variant]]: hover,
    [VARIANT_ACTIVE_CLASSES[variant]]: active,
  });
}
