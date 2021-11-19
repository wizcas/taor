import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './PageModal.module.css';
import Modal from './Modal';
import usePageModal from '@/hooks/usePageModal';

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
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className={classNames(styles.modal)}
      overlayClassName={styles.overlay}
      closeTimeoutMS={300}
      title={title}
    >
      {children}
    </Modal>
  );
}

const PageModal = observer(Component);
export default PageModal;
