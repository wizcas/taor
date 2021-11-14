import { ReactNode } from 'react';
import FeatherIcon from '../icon/FeatherIcon';
import styles from './ModalHeader.module.css';

interface Props {
  title: ReactNode;
  onClose(): void;
}

export default function ModalHeader(props: Props) {
  const { title, onClose } = props;

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button type="button" onClick={onClose}>
        <FeatherIcon icon="x" size="32px" />
      </button>
    </div>
  );
}
