import classNames from 'classnames';
import styles from './ToggleButton.module.css';

export interface ToggleButtonProps {
  label: string;
  checked: boolean;
  onToggle(checked: boolean): void;
}
export function ToggleButton(props: ToggleButtonProps) {
  const { label, checked, onToggle } = props;

  function onStateChange(e: React.ChangeEvent<HTMLInputElement>) {
    onToggle?.(e.target.checked);
  }

  return (
    <label
      className={classNames(styles.toggleButton, {
        [styles.checked]: checked,
      })}
    >
      <input type="checkbox" checked={checked} onChange={onStateChange} />
      {label}
    </label>
  );
}
