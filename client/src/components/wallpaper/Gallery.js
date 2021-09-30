import { ImageBlock } from '../common/image/ImageBlock';

export function Gallery(props) {
  const { wallpapers = [], onSelect } = props;

  function onItemSelect(wallpaper) {
    onSelect?.(wallpaper);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {wallpapers.filter(Boolean).map((wallpaper) => {
        const { id, thumbnail, raw } = wallpaper;
        return <ImageBlock key={id} thumbnail={thumbnail} raw={raw} />;
      })}
    </div>
  );
}
