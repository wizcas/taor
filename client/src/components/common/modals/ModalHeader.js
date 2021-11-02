import styles from './ModalHeader.module.css';

export function ModalHeader(props) {
  const { title, onClose } = props;

  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <button onClick={onClose}>X</button>
    </div>
  );
}
