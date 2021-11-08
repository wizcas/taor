import classNames from 'classnames';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import LoadMoreHint from './LoadMoreHint';

const HINT_THRESHOLD = 0.95;

interface ComponentProps {
  className?: string;
  hasMore?: boolean;
  loading?: boolean;
  loadMore?(): void;
  cancel?(): void;
}

type Props = PropsWithChildren<ComponentProps>;
export default function InfiniteView(props: Props) {
  const { children, className, hasMore, loading, loadMore, cancel } = props;

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
      <LoadMoreHint hasMore={hasMore} ref={hintRef} loading={loading} />
    </div>
  );
}
