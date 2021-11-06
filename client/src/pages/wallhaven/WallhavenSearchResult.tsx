import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ImageGallery from 'src/components/image/ImageGallery';
import { ImageMetadata } from 'src/components/image/types';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';

const client = new QueryClient();

interface Props {
  onSelect(wallpaper: ImageMetadata): void;
}

export default function WallhavenSearchResult(
  props: Props & { className: string }
) {
  const { className, ...rest } = props;
  return (
    <QueryClientProvider client={client}>
      <div className={className}>
        <SearchResultContent {...rest} />
      </div>
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
  const wallpapers = data?.images ?? [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ImageGallery wallpapers={wallpapers} onSelect={onSelect} />
  );
}
