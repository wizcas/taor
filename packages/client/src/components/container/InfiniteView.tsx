import classNames from 'classnames';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import LoadMoreHint, { LoadMoreHintProps } from './LoadMoreHint';

const HINT_THRESHOLD = 0.95;

interface Props extends LoadMoreHintProps {
  className?: string;
  hintClassName?: string;
  loadMore?(): void;
  cancel?(): void;
}

export default function InfiniteView({
  children,
  className,
  hintClassName,
  hasMore,
  loading,
  loadMore,
  cancel,
  ...hintProps
}: PropsWithChildren<Props>) {
  const hintRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(hintRef, { threshold: HINT_THRESHOLD });

  useEffect(() => {
    const ratio = intersection?.intersectionRatio ?? 0;
    if (ratio >= HINT_THRESHOLD && hasMore && !loading) {
      cancel?.();
      loadMore?.();
    }
  }, [intersection?.intersectionRatio, hasMore, loading]);

  return (
    <div className={classNames('flex flex-col items-stretch', className)}>
      {children}
      <LoadMoreHint
        hasMore={hasMore}
        ref={hintRef}
        loading={loading}
        className={hintClassName}
        {...hintProps}
      />
    </div>
  );
}
