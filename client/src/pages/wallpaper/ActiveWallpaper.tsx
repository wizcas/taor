import { useNavigate } from 'react-router-dom';
import CollectionList from '../collection/CollectionList';
import SingleWallpaperCard from './SingleWallpaperCard';
import Card from '@/components/container/Card';
import HeaderWithDivider from '@/components/header/HeaderWithDivider';
import FeatherIcon from '@/components/icon/FeatherIcon';

export default function ActiveWallpaper() {
  const navigate = useNavigate();
  return (
    <div className="flex-1">
      <HeaderWithDivider text="Single wallpaper" />
      <div className="grid grid-cols-[2fr,1fr] <md:grid-cols-1 gap-4 p-4">
        <SingleWallpaperCard />
        <Card onClick={() => navigate('wallhaven')}>
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
