import { observer } from 'mobx-react-lite';
import { MouseEvent, useContext } from 'react';
import { Collection } from '@/api/wallpapers/collections';
import CircleButton from '@/components/button/CircleButton';
import FeatherIcon from '@/components/icon/FeatherIcon';
import { CollectionsContext, WallpaperContext } from '@/providers';
import Badge from '@/components/badge/Badge';

interface Props {
  collection: Collection;
  canEdit?: boolean;
}

export default observer(function CollectionCardFooter({
  collection,
  canEdit,
}: Props) {
  const { id, name } = collection;
  const wallpaper = useContext(WallpaperContext);
  const isInUse =
    wallpaper.mode === 'collection' && wallpaper.collectionId === id;
  const collections = useContext(CollectionsContext);

  function onEdit(e: MouseEvent) {
    e.stopPropagation();
    collections.openEditor(collection);
  }

  return (
    <div className="flex flex-row gap-2 items-center mx-2 my-1 text-sm">
      <div className="flex-1">
        <span className="text-left">{name}</span>
        {isInUse && (
          <Badge className="ml-2" text="IN USE" type="info" size="sm" />
        )}
      </div>
      {canEdit && (
        <CircleButton className="text-gray-800" onClick={onEdit}>
          <FeatherIcon icon="edit" size="sm" />
        </CircleButton>
      )}
    </div>
  );
});
