import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Gallery from '../../components/wallpaper/Gallery';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import { ImageMetadata } from '../../components/image/types';

const client = new QueryClient();

interface Props {
  onSelect(wallpaper: ImageMetadata): void;
}

export default function WallhavenSearchResult(props: Props) {
  return (
    <QueryClientProvider client={client}>
      <SearchResultContent {...props} />
    </QueryClientProvider>
  );
}

function SearchResultContent(props: Props) {
  const { onSelect } = props;
  const [query] = useContext(WallhavenQueryContext);

  const { isLoading, data, error } = useWallhavenSearch(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }
  const wallpapers = data ?? [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Gallery wallpapers={wallpapers} onSelect={onSelect} />
    </div>
  );
}
