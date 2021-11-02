import { useMemo } from 'react';
import { ToggleGroup } from './ToggleGroup';

export function MaskToggleGroup(props) {
  const { value, onChange, ...rest } = props;

  const groupValues = useMemo(
    () => value.split('').reduce((ret, char) => [...ret, char === '1'], []),
    [value]
  );

  function onGroupValueChange(values) {
    const maskedValue = values.map((value) => (value ? '1' : '0')).join('');
    return onChange?.(maskedValue);
  }

  return (
    <ToggleGroup values={groupValues} onChange={onGroupValueChange} {...rest} />
  );
}
