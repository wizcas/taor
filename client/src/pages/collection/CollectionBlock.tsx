import take from 'lodash/fp/take';
import { Collection } from '@/api/wallpapers/collections';

interface Props {
  collection: Collection;
}

export default function CollectionBlock({ collection }: Props) {
  const thumbnails = take(4)(
    collection.images.map((image) => image.thumbnail).filter(Boolean)
  );
  const isEmpty = thumbnails.length === 0;
  return isEmpty ? (
    <div>Empty</div>
  ) : (
    <div className="grid grid-cols-2">
      {thumbnails.map((thumbnail) => (
        <InnerPreview url={thumbnail} />
      ))}
    </div>
  );
}

interface InnerPreviewProps {
  url: string;
}
function InnerPreview({ url }: InnerPreviewProps) {
  return <img src={url} alt="" />;
}
