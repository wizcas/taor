import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import FeatherIcon from '../icon/FeatherIcon';
import Spinner from '../wait/Spinner';

export interface LoadMoreHintProps {
  loadMoreText?: string;
  noMoreText?: string;
  loadingText?: string;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}
export default forwardRef(function LoadMoreHint(
  {
    loadMoreText = 'Load more',
    noMoreText = 'No more content',
    loadingText = 'Loading more',
    hasMore,
    loading,
    className,
  }: LoadMoreHintProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let prefix: JSX.Element;
  let text: JSX.Element;
  if (loading) {
    prefix = <Spinner loading={loading} size={16} />;
    text = <span>{loadingText}&hellip;</span>;
  } else if (hasMore) {
    prefix = <FeatherIcon icon="arrow-down" size="sm" />;
    text = <span>{loadMoreText}</span>;
  } else {
    prefix = <FeatherIcon icon="check" size="sm" />;
    text = <span>{noMoreText}</span>;
  }

  return (
    <div
      ref={ref}
      className={classNames(
        'p-4',
        'flex flex-row items-center justify-center gap-2',
        'text-sm',
        'text-gray-main',
        className
      )}
    >
      {prefix}
      {text}
    </div>
  );
});
