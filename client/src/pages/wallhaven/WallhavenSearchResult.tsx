import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import InfiniteLoadContainer from '@/components/container/InfiniteView';
import LoadingBanner from '@/components/wait/LoadingBanner';

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

  const l = false;
  return isLoading || l ? (
    <div className="flex-1 flex flex-col justify-center items-stretch">
      <LoadingBanner loading>Searching for wallpapers</LoadingBanner>
    </div>
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
