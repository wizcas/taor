import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import classNames from 'classnames';
import { Collection } from '@/api/wallpapers/collections';
import CircleButton from '@/components/form/CircleButton';
import FeatherIcon from '@/components/icon/FeatherIcon';
import { WallpaperContext } from '@/providers';

interface Props {
  collection: Collection;
}

export default observer(function CollectionBlockFooter({ collection }: Props) {
  const { id, name } = collection;
  const wallpaper = useContext(WallpaperContext);
  const isInUse =
    wallpaper.mode === 'collection' && wallpaper.collectionId === id;

  function use() {
    wallpaper.selectCollection(collection);
    wallpaper.mode = 'collection';
  }

  return (
    <div className="flex flex-row gap-2 items-center mx-2 my-1 text-sm">
      <div className="flex-1 text-left">{name}</div>
      {isInUse ? (
        <div
          className={classNames('text-green-600 text-sm italic leading-40px')}
        >
          Active
        </div>
      ) : (
        <CircleButton className="text-gray-800" onClick={use}>
          <FeatherIcon icon="play-circle" size="sm" />
        </CircleButton>
      )}
    </div>
  );
});
