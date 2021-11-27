import { MouseEvent, ReactNode } from 'react';
import CircleButton from '../button/CircleButton';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './ModalHeader.module.css';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  onClose?(e: MouseEvent): void;
}

export default function ModalHeader({
  title,
  subtitle,
  leading,
  onClose,
}: Props) {
  return (
    <div className={styles.header}>
      {leading && <div className={styles.leading}>{leading}</div>}
      <div className={styles.titleBar}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <CircleButton
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        color="black"
      >
        <FeatherIcon icon="x" />
      </CircleButton>
    </div>
  );
}
