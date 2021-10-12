import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Gallery } from '../../components/wallpaper/Gallery';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';

const client = new QueryClient();

export function WallhavenSearchResult(props) {
  return (
    <QueryClientProvider client={client}>
      <SearchResultContent {...props} />
    </QueryClientProvider>
  );
}

function SearchResultContent(props) {
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
