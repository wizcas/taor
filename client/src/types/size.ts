export type Size = 'sm' | 'md' | 'lg';
export type SizedStringValues<T extends string = never> = Record<
  Size | T,
  string
>;

export const SIZED_PADDINGS: SizedStringValues = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-2',
};
