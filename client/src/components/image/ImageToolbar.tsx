import classNames from 'classnames';
import { useContext } from 'react';
import CircleButton from '../form/CircleButton';
import FeatherIcon from '../icon/FeatherIcon';
import { ImageMetadata, Size, SIZED_PADDINGS } from '@/types';
import { CollectionsContext, WallpaperContext } from '@/providers';

interface Props {
  image: ImageMetadata;
  className?: string;
  size?: Size;
  onSetWallpaper?(image: ImageMetadata): void;
}

export default function ImageToolbar({
  image,
  className,
  onSetWallpaper,
  size = 'md',
}: Props) {
  const wallpaper = useContext(WallpaperContext);
  const collections = useContext(CollectionsContext);

  function setWallpaper() {
    wallpaper.selectSingle(image.raw);
    onSetWallpaper?.(image);
  }

  function addToCollection() {
    collections.openBrowser({ canCreate: true, mode: 'addTo' }, image);
  }

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
        <FeatherIcon icon="check-circle" size={size} />
      </CircleButton>
      <CircleButton onClick={addToCollection} size={size}>
        <FeatherIcon icon="bookmark" size={size} />
      </CircleButton>
    </div>
  );
}
