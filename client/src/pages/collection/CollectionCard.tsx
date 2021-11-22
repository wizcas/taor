import take from 'lodash/fp/take';
import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import CollectionCardFooter from './CollectionCardFooter';
import { Collection } from '@/api/wallpapers/collections';
import FeatherIcon from '@/components/icon/FeatherIcon';
import Card from '@/components/container/Card';

interface Props {
  collection: Collection;
  isSelected?: boolean;
  canEdit?: boolean;
  onClick?(collection: Collection): void;
}

export default observer(function CollectionCard({
  collection,
  isSelected,
  canEdit,
  onClick,
}: Props) {
  const thumbnails = take(4)(
    collection.images.map((image) => image.thumbnail).filter(Boolean)
  );
  const isEmpty = thumbnails.length === 0;
  const placeholder = (
    <div
      className={classNames(
        'flex-1 flex flex-col justify-center items-center gap-2',
        'text-gray-400 text-sm'
      )}
    >
      <FeatherIcon icon="circle" />
      <span>Nothing yet.</span>
    </div>
  );
  const preview = (
    <div className="flex-1 overflow-hidden m-2 mb-0 relative">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 @md:grid-cols-1">
        {thumbnails.map((thumbnail) => (
          <InnerPreview key={`${thumbnail}`} url={thumbnail} />
        ))}
      </div>
      <div
        className={classNames(
          'absolute right-0 bottom-0',
          'bg-dark-50 bg-opacity-50',
          'rounded-sm',
          'text-white',
          'text-xs px-2 py-0.5'
        )}
      >
        {thumbnails.length} {thumbnails.length > 1 ? 'images' : 'image'}
      </div>
    </div>
  );
  return (
    <Card onClick={() => onClick?.(collection)}>
      {isEmpty ? placeholder : preview}
      <CollectionCardFooter collection={collection} canEdit={canEdit} />
      {isSelected && (
        <div
          className={classNames(
            'absolute -top-1 right-2',
            'pointer-events-none text-primary-400',
            'filter drop-shadow-md'
          )}
        >
          <FeatherIcon
            icon="bookmark"
            className="text-red-500 "
            fill="currentColor"
            size="md"
          />
        </div>
      )}
    </Card>
  );
});

interface InnerPreviewProps {
  url: string;
}
function InnerPreview({ url }: InnerPreviewProps) {
  const style = useMemo(
    () =>
      ({
        backgroundImage: `url(${url})`,
      } as CSSProperties),
    [url]
  );
  return (
    <div
      className={classNames(
        'place-self-center rounded-md w-full h-64px',
        'bg-cover bg-center bg-no-repeat bg-clip-border'
      )}
      style={style}
    />
  );
}
