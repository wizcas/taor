import classNames from 'classnames';
import { useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './TabMenu.module.css';

export interface TabMenuItem {
  label: string;
  path: string;
}

interface Props {
  items: TabMenuItem[];
  vertical?: boolean;
}

export default function TabMenu({ items, vertical }: Props) {
  return (
    <nav
      className={classNames(styles.menu, {
        [styles.vertical]: vertical,
      })}
    >
      {items.map((item) => (
        <TabMenuItem key={item.path} item={item} />
      ))}
    </nav>
  );
}

function TabMenuItem({ item }: { item: TabMenuItem }) {
  const to = useResolvedPath(item.path);
  const match = useMatch({ path: to.pathname, end: true });
  const navigate = useNavigate();
  return (
    <Button
      key={item.path}
      onClick={() => navigate(item.path, { replace: true })}
      className={classNames(styles.item, {
        [styles.active]: match,
      })}
    >
      {item.label}
    </Button>
  );
}
