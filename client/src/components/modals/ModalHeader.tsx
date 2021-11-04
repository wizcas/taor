import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import styles from './ModalHeader.module.css';

interface Props {
  title: ReactNode;
  onClose(): void;
}

export default function ModalHeader(props: Props) {
  const { title, onClose } = props;

  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <button type="button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}
