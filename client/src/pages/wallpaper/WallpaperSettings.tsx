import { useNavigate } from 'react-router-dom';
import CollectionList from '../collection/CollectionList';
import SingleWallpaperCard from './SingleWallpaperCard';
import HeaderWithDivider from '@/components/header/HeaderWithDivider';
import FeatherIcon from '@/components/icon/FeatherIcon';
import Card from '@/components/container/Card';

export default function WallpaperSettings() {
  const navigate = useNavigate();

  function onSearchImage() {
    navigate('/wallhaven');
  }

  return (
    <div>
      <HeaderWithDivider text="Single wallpaper" />
      <div className="grid grid-cols-[2fr,1fr] <md:grid-cols-1 gap-4 p-4">
        <SingleWallpaperCard />
        <Card onClick={onSearchImage}>
          <FeatherIcon icon="search" />
          <div className="text-center mt-2">
            Search for more images &hellip;
          </div>
        </Card>
      </div>
      <HeaderWithDivider text="Collections" />
      <CollectionList mode="browse" canEdit />
    </div>
  );
}
