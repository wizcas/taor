import classNames from 'classnames';
import { CSSProperties, useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './BlockCommon.module.css';
import { WallpaperContext } from '@/providers';
import FeatherIcon from '@/components/icon/FeatherIcon';
import CircleButton from '@/components/form/CircleButton';

export default observer(function SingleWallpaperBlock() {
  const wallpaper = useContext(WallpaperContext);
  const style = useMemo(
    () =>
      ({
        backgroundImage: `url(${wallpaper.fromSingle()})`,
      } as CSSProperties),
    [wallpaper]
  );
  const isInUse = wallpaper.mode === 'single';

  function use() {
    wallpaper.mode = 'single';
  }

  const footer = (
    <div className="flex flex-row gap-2 items-center mx-2 my-1 text-sm">
      <div className="flex-1 text-left">Selected wallpaper</div>
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
  return (
    <div className={classNames(styles.block)}>
      <div
        className={classNames(
          'm-2 mb-0 h-full',
          'bg-center bg-clip-border bg-no-repeat bg-cover',
          'rounded-md'
        )}
        style={style}
      />
      {footer}
    </div>
  );
});
