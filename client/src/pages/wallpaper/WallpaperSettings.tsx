import { Outlet } from 'react-router-dom';
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

export default function WallpaperSettings() {
  return (
    <div>
      <TabMenu items={SUB_PAGES} />
      <Outlet />
    </div>
  );
}
