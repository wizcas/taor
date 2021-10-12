import { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from 'react-modal';
import { ModalHeader } from './ModalHeader';
import styles from './Modal.module.css';

function Component(props, ref) {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close} className={styles.modal}>
      <ModalHeader title={title} onClose={close} />
      <div className={styles.content}>{children}</div>
    </Modal>
  );
}

export const FullScreenModal = forwardRef(Component);
