import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import InfiniteLoadContainer from '@/components/container/InfiniteView';

const client = new QueryClient();

interface Props {
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
  const { className } = props;
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
      <ImageGallery images={images} />
    </InfiniteLoadContainer>
  );
}
