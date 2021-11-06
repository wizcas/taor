import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import Spinner from '../spinner/Spinner';

interface Props {
  loadMoreText?: string;
  noMoreText?: string;
  loadingText?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  className?: string;
}
function LoadMoreHint(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const {
    loadMoreText = 'Load more',
    noMoreText = 'No more content',
    loadingText = 'Loading',
    hasMore,
    isLoading,
    className,
  } = props;

  let prefix: JSX.Element;
  let text: string;
  if (isLoading) {
    prefix = <Spinner loading={isLoading} size={16} />;
    text = loadingText;
  } else if (hasMore) {
    prefix = <FontAwesomeIcon icon={faArrowDown} />;
    text = loadMoreText;
  } else {
    prefix = <FontAwesomeIcon icon={faCheck} />;
    text = noMoreText;
  }

  return (
    <div
      ref={ref}
      className={classNames(
        'p-4',
        'flex flex-row items-center justify-center gap-2',
        'text-sm',
        'text-gray-400',
        className
      )}
    >
      {prefix}
      <span>{text}</span>
    </div>
  );
}

const LoadMoreHintWithRef = forwardRef(LoadMoreHint);
export default LoadMoreHintWithRef;
