import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Gallery } from '../../components/wallpaper/Gallery';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';

const client = new QueryClient();

export function WallhavenGallery() {
  return (
    <QueryClientProvider client={client}>
      <WallhavenGalleryContent />
    </QueryClientProvider>
  );
}

function WallhavenGalleryContent() {
  const { query } = useContext(WallhavenQueryContext);

  const { isLoading, data, error } = useWallhavenSearch(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }
  const wallpapers = data ?? [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Gallery wallpapers={wallpapers} />
    </div>
  );
}
