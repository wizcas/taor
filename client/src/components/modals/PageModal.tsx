import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import usePageModal from 'src/hooks/usePageModal';
import ModalHeader from './ModalHeader';
import styles from './Modal.module.css';

interface Props {
  title: ReactNode;
  children: ReactNode;
}

function Component(props: Props) {
  const { title, children } = props;
  const { close } = usePageModal();
  const location = useLocation();
  const isOpen = !!location.pathname && location.pathname !== '/';

  return (
    <Modal isOpen={isOpen} onRequestClose={close} className={styles.modal}>
      <ModalHeader title={title} onClose={close} />
      <div className={styles.content}>{children}</div>
    </Modal>
  );
}

const PageModal = observer(Component);
export default PageModal;
