import { ReactNode } from 'react';
import CircleButton from '../form/CircleButton';
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
      <CircleButton type="button" onClick={onClose} color="black">
        <FeatherIcon icon="x" size="md" />
      </CircleButton>
    </div>
  );
}
