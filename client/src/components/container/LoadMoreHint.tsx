import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import Spinner from '../wait/Spinner';

interface Props {
  loadMoreText?: string;
  noMoreText?: string;
  loadingText?: string;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}
function LoadMoreHint(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const {
    loadMoreText = 'Load more',
    noMoreText = 'No more content',
    loadingText = 'Loading more',
    hasMore,
    loading,
    className,
  } = props;

  let prefix: JSX.Element;
  let text: JSX.Element;
  if (loading) {
    prefix = <Spinner loading={loading} size={16} />;
    text = <span>{loadingText}&hellip;</span>;
  } else if (hasMore) {
    prefix = <FontAwesomeIcon icon={faArrowDown} />;
    text = <span>{loadMoreText}</span>;
  } else {
    prefix = <FontAwesomeIcon icon={faCheck} />;
    text = <span>{noMoreText}</span>;
  }

  return (
    <div
      ref={ref}
      className={classNames(
        'p-4',
        'flex flex-row items-center justify-center gap-2',
        'text-sm',
        'text-gray-600',
        className
      )}
    >
      {prefix}
      {text}
    </div>
  );
}

const LoadMoreHintWithRef = forwardRef(LoadMoreHint);
export default LoadMoreHintWithRef;
