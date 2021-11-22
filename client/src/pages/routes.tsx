import { RouteObject } from 'react-router-dom';
import WallhavenWrapper from './wallhaven/Wrapper';
import WallpaperSettings from './wallpaper/WallpaperSettings';

export default [
  {
    path: '/',
    element: <></>,
  },
  {
    path: 'wallpaper-settings',
    element: <WallpaperSettings />,
  },
  {
    path: 'wallhaven',
    element: <WallhavenWrapper />,
  },
] as RouteObject[];
