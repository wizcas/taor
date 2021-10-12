import { useContext } from 'react';
import Modal from 'react-modal';
import { ModalHeader } from './ModalHeader';
import { PageModalContext } from '../../../context/pageModal';
import { observer } from 'mobx-react-lite';
import styles from './Modal.module.css';

function Component(props, ref) {
  const { title, children } = props;
  const pageModal = useContext(PageModalContext);

  function close() {
    pageModal.close();
  }

  return (
    <Modal
      isOpen={pageModal.isOpen}
      onRequestClose={close}
      className={styles.modal}
    >
      <ModalHeader title={title} onClose={close} />
      <div className={styles.content}>{children}</div>
    </Modal>
  );
}

export const PageModal = observer(Component);
