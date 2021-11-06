import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import classNames from 'classnames';
import ImageGallery from 'src/components/image/ImageGallery';
import LoadMoreHint from 'src/components/list/LoadMoreHint';
import { EMPTY_PAGINATION, Pagination, ImageMetadata } from 'src/types';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';

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

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className={classNames('flex flex-col items-stretch', className)}>
      <ImageGallery wallpapers={wallpapers} onSelect={onSelect} />
      <LoadMoreHint hasMore={hasMore} />
    </div>
  );
}
