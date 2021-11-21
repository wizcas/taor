import classNames from 'classnames';
import { useEffect, useState } from 'react';
import FeatherIcon from '../icon/FeatherIcon';

interface Props {
  value?: string;
  className?: string;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
}

export default function EditableTextBox({
  value,
  className,
  onSubmit,
  disabled,
}: Props) {
  const [editingValue, setEditingValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  function edit() {
    if (disabled) return;
    setIsEditing(true);
  }

  function exit() {
    setIsEditing(false);
  }

  function submit() {
    onSubmit?.(editingValue ?? '');
    exit();
  }

  function onSpanKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    let handled = false;
    if (e.key === 'Enter') {
      edit();
      handled = true;
    }
    if (handled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    let handled = false;
    if (e.key === 'Enter') {
      submit();
      handled = true;
    } else if (e.key === 'Escape') {
      exit();
      handled = true;
    }
    if (handled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  useEffect(() => {
    setEditingValue(value);
  }, [value]);

  return (
    <div className={classNames(className)}>
      {isEditing ? (
        <input
          type="text"
          onChange={(e) => setEditingValue(e.target.value)}
          value={editingValue}
          onKeyDown={onInputKeyDown}
          onBlur={exit}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      ) : (
        <div
          className="flex flex-row gap-2 items-center"
          role="textbox"
          tabIndex={0}
          onClick={edit}
          onKeyDown={onSpanKeyDown}
        >
          <span>{value}</span>
          <FeatherIcon icon="edit-3" />
        </div>
      )}
    </div>
  );
}
