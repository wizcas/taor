import { useRef } from 'react';
import { ImageBlock } from '../common/image/ImageBlock';
import { ImageLightBox } from '../common/image/ImageLightBox';

export function Gallery(props) {
  const { wallpapers = [], onSelect } = props;
  const lightBoxRef = useRef(null);

  function onItemSelect(wallpaper) {
    onSelect?.(wallpaper);
  }

  function showLightBox(url) {
    lightBoxRef.current.open(url);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {wallpapers.filter(Boolean).map((wallpaper) => {
          const { id, thumbnail, raw } = wallpaper;
          return (
            <ImageBlock
              key={id}
              thumbnail={thumbnail}
              raw={raw}
              onViewImage={showLightBox}
            />
          );
        })}
      </div>
      <ImageLightBox ref={lightBoxRef} />
    </>
  );
}
