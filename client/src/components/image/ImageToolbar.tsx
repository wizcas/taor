import classNames from 'classnames';
import { useContext } from 'react';
import CircleButton from '../form/CircleButton';
import FeatherIcon, { IconSizes } from '../icon/FeatherIcon';
import { ImageMetadata, Size, SIZED_PADDINGS } from '@/types';
import { CollectionsContext, WallpaperContext } from '@/providers';

interface Props {
  image: ImageMetadata;
  className?: string;
  size?: Size;
  iconSize?: IconSizes;
  onSetWallpaper?(image: ImageMetadata): void;
}

export default function ImageToolbar({
  image,
  className,
  onSetWallpaper,
  size = 'md',
  iconSize,
}: Props) {
  const wallpaper = useContext(WallpaperContext);
  const collections = useContext(CollectionsContext);

  function setWallpaper() {
    wallpaper.selectSingle(image.raw);
    wallpaper.mode = 'single';
    onSetWallpaper?.(image);
  }

  function addToCollection() {
    collections.openBrowser({ canCreate: true, mode: 'addTo' }, image);
  }

  iconSize = iconSize || size;

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
      <CircleButton onClick={setWallpaper} size={size}>
        <FeatherIcon icon="check-circle" size={iconSize} />
      </CircleButton>
      <CircleButton onClick={addToCollection} size={size}>
        <FeatherIcon icon="bookmark" size={iconSize} />
      </CircleButton>
    </div>
  );
}
