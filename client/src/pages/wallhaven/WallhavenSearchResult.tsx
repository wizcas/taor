import { useCallback, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import { ImageMetadata } from '@/types';
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

  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useWallhavenSearch(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }
  const wallpapers: ImageMetadata[] =
    data?.pages.reduce((all, page) => {
      all.push(...page.images);
      return all;
    }, [] as ImageMetadata[]) ?? [];

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <InfiniteLoadContainer
      hasMore={hasNextPage}
      className={className}
      loadMore={loadMore}
      loading={isFetchingNextPage}
    >
      <ImageGallery wallpapers={wallpapers} onSelect={onSelect} />
    </InfiniteLoadContainer>
  );
}
