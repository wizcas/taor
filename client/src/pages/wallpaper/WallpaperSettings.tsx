import CollectionList from '../collection/CollectionList';
import SingleWallpaperBlock from './SingleWallpaperBlock';
import HeaderWithDivider from '@/components/header/HeaderWithDivider';
import FeatherIcon from '@/components/icon/FeatherIcon';
import Card from '@/components/container/Card';

export default function WallpaperSettings() {
  return (
    <div>
      <HeaderWithDivider text="Single wallpaper" />
      <div className="grid grid-cols-[2fr,1fr] <md:grid-cols-1 gap-4 p-4">
        <SingleWallpaperBlock />
        <Card>
          <FeatherIcon icon="search" />
          <div className="text-center mt-2">
            Search for more images &hellip;
          </div>
        </Card>
      </div>
      <HeaderWithDivider text="Collections" />
      <CollectionList mode="browse" />
    </div>
  );
}
