import { useMemo } from 'react';
import classNames from 'classnames';
import styles from './ToggleGroup.module.css';

export function ToggleGroup(props) {
  const { options, values = [], onChange } = props;

  const initialValues = useMemo(
    () => options.map((_, i) => Boolean(values[i] ?? false)),
    [options, values],
  );

  function onToggleButtonChange(index) {
    function fn() {
      const next = [...initialValues];
      next[index] = !initialValues[index];
      onChange?.(next);
    }
    return fn;
  }

  return (
    <div className={styles.toggleGroup}>
      {options.map(({ label, value }, i) => (
        <ToggleButton
          key={value}
          label={label}
          value={value}
          checked={initialValues[i]}
          onToggle={onToggleButtonChange(i)}
        />
      ))}
    </div>
  );
}

function ToggleButton(props) {
  const {
    label, value, checked, onToggle,
  } = props;

  function onStateChange(e) {
    onToggle?.(e.target.checked);
  }

  return (
    <label
      className={classNames({
        [styles.checked]: checked,
      })}
    >
      <input
        type="checkbox"
        key={value}
        checked={checked}
        onChange={onStateChange}
      />
      {label}
    </label>
  );
}
