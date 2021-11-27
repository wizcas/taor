import { useMemo } from 'react';
import { ToggleButton } from './ToggleButton';

import styles from './ToggleGroup.module.css';

export interface ToggleGroupOption {
  key: string;
  label: string;
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  values?: boolean[];
  onChange?(values: boolean[]): void;
}

export function ToggleGroup(props: ToggleGroupProps) {
  const { options, values = [], onChange } = props;

  const initialValues = useMemo(
    () => options.map((_, i) => Boolean(values[i] ?? false)),
    [options, values]
  );

  function onToggleButtonChange(index: number) {
    function fn() {
      const next = [...initialValues];
      next[index] = !initialValues[index];
      onChange?.(next);
    }
    return fn;
  }

  return (
    <div className={styles.toggleGroup}>
      {options.map(({ label, key }, i) => (
        <ToggleButton
          key={key}
          label={label}
          checked={initialValues[i]}
          onToggle={onToggleButtonChange(i)}
        />
      ))}
    </div>
  );
}
