import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import Spinner from './Spinner';

interface ComponentProps {
  loading?: boolean;
}

type Props = PropsWithChildren<ComponentProps>;

export default function LoadingBanner(props: Props) {
  const { children = 'Loading', loading } = props;
  const content =
    typeof children === 'string' ? <span>{children}&hellip;</span> : children;
  return loading ? (
    <div
      className={classNames(
        'flex flex-row justify-center items-center gap-2',
        'secondary-text'
      )}
    >
      <Spinner loading size={16} />
      {content}
    </div>
  ) : (
    <></>
  );
}
