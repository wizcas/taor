import { RouteObject } from 'react-router-dom';
import WallhavenWrapper from './wallhaven/Wrapper';
import WallpaperSettings from './wallpaper/WallpaperSettings';

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
    path: 'wallpaper-settings',
    element: <WallpaperSettings />,
    title: 'Choose your wallpaper',
  },
  {
    path: 'wallhaven',
    element: <WallhavenWrapper />,
    title: 'Pick one from Wallhaven',
  },
] as TitledRouteObject[];
