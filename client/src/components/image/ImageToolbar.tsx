import classNames from 'classnames';
import { useContext } from 'react';
import CircleButton from '../button/CircleButton';
import FeatherIcon, { IconSizes } from '../icon/FeatherIcon';
import { ImageMetadata, Size, SIZED_PADDINGS } from '@/types';
import { CollectionsContext, WallpaperContext } from '@/providers';

interface Props {
  image: ImageMetadata;
  className?: string;
  size?: Size;
  iconSize?: IconSizes;
  actions?: ImageToolbarActions;
  onSetWallpaper?(image: ImageMetadata): void;
}

type ImageToolbarAction = 'apply' | 'collect' | 'remove';
export type ImageToolbarActions = ImageToolbarAction[];

export default function ImageToolbar({
  image,
  className,
  onSetWallpaper,
  size = 'md',
  iconSize,
  actions = ['apply', 'collect'],
}: Props) {
  const wallpaper = useContext(WallpaperContext);
  const collections = useContext(CollectionsContext);

  iconSize = iconSize || size;
  function hasAction(action: ImageToolbarAction) {
    return actions.includes(action);
  }
  function apply() {
    wallpaper.selectSingle(image.raw);
    wallpaper.mode = 'single';
    onSetWallpaper?.(image);
  }

  function collect() {
    collections.openBrowser({ canCreate: true, mode: 'addTo' }, image);
  }

  function remove() {
    if (!collections.editingCollection) return;
    collections.deleteImageFromCollection(image, collections.editingCollection);
  }

  const buttons = (
    <>
      {hasAction('apply') && (
        <CircleButton onClick={apply} size={size}>
          <FeatherIcon icon="check-circle" size={iconSize} />
        </CircleButton>
      )}
      {hasAction('collect') && (
        <CircleButton onClick={collect} size={size}>
          <FeatherIcon icon="bookmark" size={iconSize} />
        </CircleButton>
      )}
      {hasAction('remove') && (
        <CircleButton onClick={remove} size={size} className="text-red-600">
          <FeatherIcon icon="trash" size={iconSize} />
        </CircleButton>
      )}
    </>
  );

  return (
    <div
      className={classNames(
        'bg-black',
        'bg-opacity-50',
        SIZED_PADDINGS[size],
        'rounded-md',
        'text-white',
        'flex',
        'flex-row',
        'items-center',
        className
      )}
    >
      {buttons}
    </div>
  );
}
