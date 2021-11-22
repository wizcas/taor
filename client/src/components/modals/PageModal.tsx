import { observer } from 'mobx-react-lite';
import { Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './PageModal.module.css';
import Modal from './Modal';
import usePageModal from '@/hooks/usePageModal';

interface Props {
  title: ReactNode;
  routes: RouteObject[];
}

function Component({ title, routes }: Props) {
  const { close } = usePageModal();
  const routeElement = useRoutes(routes);
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
      {routeElement}
      <Outlet />
    </Modal>
  );
}

const PageModal = observer(Component);
export default PageModal;
