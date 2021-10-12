import { useContext } from 'react';
import Modal from 'react-modal';
import { ModalHeader } from './ModalHeader';
import { PageModalContext } from '../../../context/pageModal';
import { observer } from 'mobx-react-lite';
import styles from './Modal.module.css';
import { useHistory, useLocation } from 'react-router';

function Component(props, ref) {
  const { title, children } = props;
  // const pageModal = useContext(PageModalContext);
  const history = useHistory();
  const location = useLocation();
  const isOpen = location.pathname && location.pathname !== '/';

  function close() {
    // pageModal.close();
    history.push('/');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close} className={styles.modal}>
      <ModalHeader title={title} onClose={close} />
      <div className={styles.content}>{children}</div>
    </Modal>
  );
}

export const PageModal = observer(Component);
