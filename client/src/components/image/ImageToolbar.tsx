import classNames from 'classnames';
import { useContext } from 'react';
import CircleButton from '../form/CircleButton';
import FeatherIcon from '../icon/FeatherIcon';
import { ImageMetadata, Size, SIZED_PADDINGS } from '@/types';
import { PreferencesContext } from '@/providers/PreferencesStore';

interface Props {
  image: ImageMetadata;
  className?: string;
  size?: Size;
  onSetWallpaper?(image: ImageMetadata): void;
}

export default function ImageToolbar(props: Props) {
  const { image, className, onSetWallpaper, size = 'md' } = props;
  const preferences = useContext(PreferencesContext);

  function setWallpaper() {
    preferences.wallpaperUrl = image.raw;
    onSetWallpaper?.(image);
  }

  return (
    <div
      className={classNames(
        'bg-black',
        'bg-opacity-50',
        SIZED_PADDINGS[size],
        'rounded-md',
        'text-white',
        className
      )}
    >
      <CircleButton onClick={setWallpaper} size={size}>
        <FeatherIcon icon="check-circle" size={size} />
      </CircleButton>
    </div>
  );
}
