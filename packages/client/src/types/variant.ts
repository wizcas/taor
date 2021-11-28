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
  normal: 'bg-white-main bg-opacity-60 text-gray-main',
  primary: 'bg-primary-400 text-black-secondary',
  secondary: 'bg-gray-300 text-black-secondary',
  info: 'bg-blue-500 text-white-main',
  success: 'bg-green-400 text-black-secondary',
  warning: 'bg-yellow-400 text-black-secondary',
  danger: 'bg-red-500 text-white-main',
};
const VARIANT_HOVER_CLASSES: Record<Variants, string> = {
  normal: 'hover:(bg-opacity-80)',
  primary: 'hover:(bg-primary-500)',
  secondary: 'hover:(bg-gray-400)',
  info: 'hover:(bg-blue-600)',
  success: 'hover:(bg-green-500)',
  warning: 'hover:(bg-yellow-500)',
  danger: 'hover:(bg-red-600) ',
};
const VARIANT_ACTIVE_CLASSES: Record<Variants, string> = {
  normal: 'active:(ring-inset ring-white-secondary)',
  primary: 'active:(ring-inset ring-primary-600)',
  secondary: 'active:(ring-inset ring-gray-500)',
  info: 'active:(ring-inset ring-blue-700)',
  success: 'active:(ring-inset ring-green-600)',
  warning: 'active:(ring-inset ring-yellow-600)',
  danger: 'active:(ring-inset ring-red-700)',
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
