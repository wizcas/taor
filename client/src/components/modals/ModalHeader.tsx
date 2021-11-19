import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import CircleButton from '../form/CircleButton';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './ModalHeader.module.css';
import type { Size } from '@/types';

interface Props {
  title?: ReactNode;
  size?: Size;
  onClose?(e: MouseEvent): void;
}

export default function ModalHeader({ title, onClose, size = 'md' }: Props) {
  return (
    <div className={styles.header}>
      <h3
        className={classNames(styles.title, {
          'text-base': size === 'sm',
          'text-lg': size === 'md' || size === 'lg',
        })}
      >
        {title}
      </h3>
      <CircleButton
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        color="black"
      >
        <FeatherIcon icon="x" size={size} />
      </CircleButton>
    </div>
  );
}
