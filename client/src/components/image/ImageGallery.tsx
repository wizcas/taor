import { useRef } from 'react';
import ImageBlock from './ImageBlock';
import ImageLightBox, { ImageLightBoxRef } from './ImageLightBox';
import type { ImageMetadata } from '@/types';

interface Props {
  images: ImageMetadata[];
}
export default function ImageGallery(props: Props) {
  const { images = [] } = props;
  const lightBoxRef = useRef<ImageLightBoxRef>(null);

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
            <ImageBlock key={id} image={wallpaper} onViewImage={showLightBox} />
          );
        })}
      </div>
      <ImageLightBox ref={lightBoxRef} />
    </>
  );
}
