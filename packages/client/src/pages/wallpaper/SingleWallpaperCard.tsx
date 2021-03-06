import classNames from 'classnames';
import { CSSProperties, useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { computed } from 'mobx';
import { WallpaperContext } from '@/providers';
import Card from '@/components/container/Card';
import Badge from '@/components/badge/Badge';

export default observer(function SingleWallpaperCard() {
  const wallpaper = useContext(WallpaperContext);
  const single = computed(() => wallpaper.fromSingle());
  const style = useMemo(
    () =>
      ({
        backgroundImage: `url(${single})`,
      } as CSSProperties),
    [wallpaper]
  );
  const isInUse = wallpaper.mode === 'single';

  function activate() {
    wallpaper.mode = 'single';
  }

  const status = (
    <div className="absolute left-2 bottom-2">
      {isInUse && <Badge type="info" size="sm" text="IN USE" />}
    </div>
  );
  return (
    <Card className={classNames('p-2')} onClick={activate}>
      <div
        className={classNames(
          'bg-center bg-clip-border bg-no-repeat bg-cover',
          'rounded-md',
          'flex-1 relative'
        )}
        style={style}
      >
        {status}
      </div>
    </Card>
  );
});
