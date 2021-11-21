export type Variants =
  | 'normal'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';
const VARIANT_CLASSES: Record<Variants, string> = {
  normal: 'bg-white text-dark-500',
  primary: 'bg-primary-400 text-dark-500',
  secondary: 'bg-gray-300 text-dark-500',
  info: 'bg-blue-500 text-light-500',
  success: 'bg-green-400 text-dark-500',
  warning: 'bg-yellow-400 text-dark-500',
  danger: 'bg-red-500 text-dark-500',
};
export function getVariantClass(colorType: Variants) {
  return VARIANT_CLASSES[colorType];
}
