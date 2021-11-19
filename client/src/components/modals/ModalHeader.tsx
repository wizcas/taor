import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import CircleButton from '../form/CircleButton';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './ModalHeader.module.css';

interface Props {
  title?: ReactNode;
  onClose?(e: MouseEvent): void;
}

export default function ModalHeader({ title, onClose }: Props) {
  return (
    <div className={styles.header}>
      <h3 className={classNames(styles.title)}>{title}</h3>
      <CircleButton
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        color="black"
      >
        <FeatherIcon icon="x" size="sm" />
      </CircleButton>
    </div>
  );
}
