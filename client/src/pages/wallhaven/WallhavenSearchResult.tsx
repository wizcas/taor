import { useCallback, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import { EMPTY_PAGINATION, Pagination, ImageMetadata } from '@/types';
import InfiniteLoadContainer from '@/components/container/InfiniteView';

const client = new QueryClient();

interface Props {
  onSelect(wallpaper: ImageMetadata): void;
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

  const { isLoading, data, error } = useWallhavenSearch(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }
  const wallpapers: ImageMetadata[] = data?.images ?? [];
  const pagination: Pagination = data?.pagination ?? EMPTY_PAGINATION;
  const hasMore = pagination.currentPage < pagination.lastPage;

  const loadMore = useCallback(() => {
    console.log('load more');
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <InfiniteLoadContainer
      hasMore={hasMore}
      className={className}
      loadMore={loadMore}
    >
      <ImageGallery wallpapers={wallpapers} onSelect={onSelect} />
    </InfiniteLoadContainer>
  );
}
