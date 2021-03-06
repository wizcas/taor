import { RouteObject } from 'react-router-dom';
import WallhavenWrapper from './wallhaven/Wrapper';
import ActiveWallpaper from './wallpaper/ActiveWallpaper';
import WallpaperPage from './wallpaper/WallpaperPage';

export interface TitledRouteObject extends RouteObject {
  title: string;
  subtitle?: string;
}

export default [
  {
    path: '/',
    element: <></>,
  },
  {
    path: 'wallpaper',
    element: <WallpaperPage />,
    title: 'Pick wallpapers',
    children: [
      { index: true, element: <ActiveWallpaper /> },
      {
        path: 'wallhaven',
        element: <WallhavenWrapper />,
      },
    ],
  },
] as TitledRouteObject[];
