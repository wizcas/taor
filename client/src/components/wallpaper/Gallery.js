import { useRef } from 'react';
import { ImageBlock } from '../common/image/ImageBlock';
import { ImageLightBox } from '../common/image/ImageLightBox';

export function Gallery(props) {
  const { wallpapers = [], onSelect } = props;
  const lightBoxRef = useRef(null);

  function onItemSelect(wallpaper) {
    onSelect?.(wallpaper);
  }

  function showLightBox(url, width, height) {
    lightBoxRef.current.open(url, width, height);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {wallpapers.filter(Boolean).map((wallpaper) => {
          const { id } = wallpaper;
          return (
            <ImageBlock key={id} image={wallpaper} onViewImage={showLightBox} />
          );
        })}
      </div>
      <ImageLightBox ref={lightBoxRef} />
    </>
  );
}
