import { observer } from 'mobx-react-lite';
import {
  matchRoutes,
  Outlet,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import classNames from 'classnames';
import styles from './PageModal.module.css';
import Modal from './Modal';
import usePageModal from '@/hooks/usePageModal';
import { TitledRouteObject } from '@/pages/routes';

interface Props {
  routes: RouteObject[];
}

function Component({ routes }: Props) {
  const { close } = usePageModal();
  const routeElement = useRoutes(routes);
  const location = useLocation();
  const isOpen = !!location.pathname && location.pathname !== '/';

  const matches = matchRoutes(routes, location);
  let title = '';
  let subtitle: string | undefined;
  if (matches && matches?.length > 0) {
    const currentRoute = matches[0].route as TitledRouteObject;
    title = currentRoute.title;
    subtitle = currentRoute.subtitle;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className={classNames(styles.modal)}
      overlayClassName={styles.overlay}
      closeTimeoutMS={300}
      title={title}
      subtitle={subtitle}
    >
      {routeElement}
      <Outlet />
    </Modal>
  );
}

const PageModal = observer(Component);
export default PageModal;
