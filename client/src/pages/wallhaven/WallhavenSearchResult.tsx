import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import { ImageMetadata } from '@/types';
import InfiniteLoadContainer from '@/components/container/InfiniteView';

const client = new QueryClient();

interface Props {
  onSelect(image: ImageMetadata): void;
  className?: string;
}

export default function WallhavenSearchResult(
  props: Props & { className: string }
) {
  return (
    <QueryClientProvider client={client}>
      <SearchResultContent {...props} />
    </QueryClientProvider>
  );
}

function SearchResultContent(props: Props) {
  const { onSelect, className } = props;
  const [query] = useContext(WallhavenQueryContext);

  const { images, isLoading, error, hasMore, isLoadingMore, loadMore } =
    useWallhavenSearch(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <InfiniteLoadContainer
      hasMore={hasMore}
      className={className}
      loadMore={loadMore}
      loading={isLoadingMore}
    >
      <ImageGallery images={images} onSelect={onSelect} />
    </InfiniteLoadContainer>
  );
}
