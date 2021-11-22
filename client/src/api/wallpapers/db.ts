import Dexie from 'dexie';

const WALLPAPER_DB = new Dexie('WallpaperDatabase');
WALLPAPER_DB.version(1).stores({
  collections: '++id, name, images',
});
export default WALLPAPER_DB;
