import take from 'lodash/fp/take';
import classNames from 'classnames';
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
    <div className="flex-1 relative p-2 flex flex-row flex-wrap gap-1">
      {thumbnails.map((thumbnail) => (
        <InnerPreview key={`${thumbnail}`} url={thumbnail} />
      ))}
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
      <div className="self-center p-2 text-sm">{collection.name}</div>
      {isSelected && (
        <div className="absolute top-2 right-2 pointer-events-none text-primary-400">
          <FeatherIcon icon="check-circle" size="sm" />
        </div>
      )}
    </button>
  );
}

interface InnerPreviewProps {
  url: string;
}
function InnerPreview({ url }: InnerPreviewProps) {
  return <img src={url} alt="" className="place-self-center rounded-md h-10" />;
}
