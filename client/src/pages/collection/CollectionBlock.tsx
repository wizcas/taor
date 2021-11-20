import take from 'lodash/fp/take';
import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
import styles from './BlockCommon.module.css';
import { Collection } from '@/api/wallpapers/collections';
import FeatherIcon from '@/components/icon/FeatherIcon';

interface Props {
  collection: Collection;
  isSelected?: boolean;
  onClick?(collection: Collection): void;
}

export default function CollectionBlock({
  collection,
  isSelected,
  onClick,
}: Props) {
  const thumbnails = take(4)(
    collection.images.map((image) => image.thumbnail).filter(Boolean)
  );
  const isEmpty = thumbnails.length === 0;
  const placeholder = (
    <div className="flex-1 flex flex-col justify-center text-gray-400">
      Empty
    </div>
  );
  const preview = (
    <div className="flex-1 overflow-hidden m-2 mb-0">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 @md:grid-cols-1">
        {thumbnails.map((thumbnail) => (
          <InnerPreview key={`${thumbnail}`} url={thumbnail} />
        ))}
      </div>
    </div>
  );
  return (
    <button
      type="button"
      className={classNames(styles.block, {
        [styles.interactive]: !!onClick,
      })}
      onClick={() => onClick?.(collection)}
      disabled={!onClick}
    >
      {isEmpty ? placeholder : preview}
      <div className="self-center m-2 text-sm">{collection.name}</div>
      {isSelected && (
        <div
          className="absolute -top-1 right-2 pointer-events-none text-primary-400
        filter drop-shadow-md"
        >
          <FeatherIcon
            icon="bookmark"
            className="text-red-500 "
            fill="currentColor"
            size="md"
          />
        </div>
      )}
    </button>
  );
}

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
        'place-self-center rounded-md w-full h-70px',
        'bg-cover bg-center bg-no-repeat bg-clip-border'
      )}
      style={style}
    />
  );
}
