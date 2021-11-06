import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import classNames from 'classnames';
import { WallhavenQueryContext } from './context';
import { useWallhavenSearch } from './api';
import ImageGallery from '@/components/image/ImageGallery';
import LoadMoreHint from '@/components/list/LoadMoreHint';
import { EMPTY_PAGINATION, Pagination, ImageMetadata } from '@/types';

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
