import { useMemo } from 'react';
import { ToggleGroup, ToggleGroupProps } from './ToggleGroup';

interface Props extends Omit<ToggleGroupProps, 'onChange' | 'values'> {
  values: string;
  onChange: (value: string) => void;
}
export default function MaskToggleGroup(props: Props) {
  const { values: value, onChange, ...rest } = props;

  const groupValues = useMemo<boolean[]>(
    () =>
      value
        .split('')
        .reduce((ret, char) => [...ret, char === '1'], [] as boolean[]),
    [value]
  );

  function onGroupValueChange(values: boolean[]) {
    const maskedValue = values.map((value) => (value ? '1' : '0')).join('');
    return onChange?.(maskedValue);
  }

  return (
    <ToggleGroup values={groupValues} onChange={onGroupValueChange} {...rest} />
  );
}
