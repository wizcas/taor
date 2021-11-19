import classNames from 'classnames';

export type HintType = 'info' | 'warn' | 'error' | 'success';

interface Props {
  type: HintType;
  message: string;
}

const TYPE_CLASSES: Record<HintType, string> = {
  info: 'text-blue-800',
  warn: 'text-yellow-600',
  success: 'text-green-700',
  error: 'text-red-800',
};

export default function FieldHint({ type, message }: Props) {
  return (
    <div className={classNames('text-sm', TYPE_CLASSES[type])}>{message}</div>
  );
}
