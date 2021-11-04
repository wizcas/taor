import { useRef } from 'react';
import ImageBlock from '../image/ImageBlock';
import ImageLightBox, { ImageLightBoxRef } from '../image/ImageLightBox';
import { ImageMetadata } from '../image/types';

interface Props {
  wallpapers: ImageMetadata[];
  onSelect(wallpaper: ImageMetadata): void;
}
export default function Gallery(props: Props) {
  const { wallpapers = [], onSelect } = props;
  const lightBoxRef = useRef<ImageLightBoxRef>(null);

  function onItemSelect(wallpaper: ImageMetadata) {
    onSelect?.(wallpaper);
  }

  function showLightBox(wallpaper: ImageMetadata) {
    if (lightBoxRef.current) {
      lightBoxRef.current.open(wallpaper);
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {wallpapers.filter(Boolean).map((wallpaper) => {
          const { id } = wallpaper;
          return (
            <ImageBlock
              key={id}
              image={wallpaper}
              onViewImage={showLightBox}
              onSelect={onItemSelect}
            />
          );
        })}
      </div>
      <ImageLightBox ref={lightBoxRef} onSelect={onItemSelect} />
    </>
  );
}
