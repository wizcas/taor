import { Outlet } from 'react-router-dom';
import styles from './WallpaperPage.module.css';
import TabMenu, { TabMenuItem } from '@/components/tab/TabMenu';

const SUB_PAGES: TabMenuItem[] = [
  {
    label: 'Active Wallpaper',
    path: '.',
  },
  {
    label: 'Wallhaven',
    path: 'wallhaven',
  },
];

export default function WallpaperPage() {
  return (
    <div className={styles.layout}>
      <TabMenu items={SUB_PAGES} vertical />
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
}
