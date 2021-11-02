import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';
import { ModalHeader } from './ModalHeader';
import styles from './Modal.module.css';
import { usePageModal } from '../../../hooks/usePageModal';

function Component(props, ref) {
  const { title, children } = props;
  const { close } = usePageModal();
  const location = useLocation();
  const isOpen = location.pathname && location.pathname !== '/';

  return (
    <Modal isOpen={isOpen} onRequestClose={close} className={styles.modal}>
      <ModalHeader title={title} onClose={close} />
      <div className={styles.content}>{children}</div>
    </Modal>
  );
}

export const PageModal = observer(Component);
