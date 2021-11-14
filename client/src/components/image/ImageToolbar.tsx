import classNames from 'classnames';
import { useContext } from 'react';
import CircleButton from '../form/CircleButton';
import { ImageMetadata } from '@/types';
import { PreferencesContext } from '@/store/preferences';
import FeatherIcon from '../icon/FeatherIcon';

interface Props {
  image: ImageMetadata;
  className?: string;
  onSetWallpaper?(image: ImageMetadata): void;
}

export default function ImageToolbar(props: Props) {
  const { image, className, onSetWallpaper } = props;
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
        'p-2',
        'rounded-md',
        className
      )}
    >
      <CircleButton onClick={setWallpaper} size="32px">
        <FeatherIcon icon="check-circle" />
      </CircleButton>
    </div>
  );
}
