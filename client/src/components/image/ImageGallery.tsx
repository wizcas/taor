import { useRef } from 'react';
import ImageBlock from './ImageBlock';
import ImageLightBox, { ImageLightBoxRef } from './ImageLightBox';
import type { ImageMetadata } from '@/types';

interface Props {
  images: ImageMetadata[];
  onSelect(wallpaper: ImageMetadata): void;
}
export default function ImageGallery(props: Props) {
  const { images = [], onSelect } = props;
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
      <div className="relative grid grid-cols-4 gap-4 auto-rows-fr">
        {images.filter(Boolean).map((wallpaper) => {
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
