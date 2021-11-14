export type Size = 'sm' | 'md' | 'lg';
export type SizedStringValues = Record<Size, string>;

export const SIZED_PADDINGS: SizedStringValues = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-4',
};
