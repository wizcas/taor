import Tippy, { TippyProps } from '@tippyjs/react';
import classNames from 'classnames';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './FieldHint.module.css';

export type HintType = 'info' | 'warn' | 'error' | 'success';

interface Props extends TippyProps {
  type: HintType;
  message: string;
}

const ICONS: Record<HintType, string> = {
  info: 'info',
  warn: 'alert-circle',
  success: 'check-circle',
  error: 'x-circle',
};

export default function FieldHint({
  type,
  message,
  placement,
  reference,
}: Props) {
  const content = (
    <div className="flex flex-row gap-2 items-center">
      <FeatherIcon icon={ICONS[type]} size="sm" />
      {message}
    </div>
  );
  return (
    <Tippy
      reference={reference}
      placement={placement}
      showOnCreate
      hideOnClick
      trigger="focusin"
      className={classNames('text-sm', styles.hint, styles[type])}
      content={content}
    />
  );
}
