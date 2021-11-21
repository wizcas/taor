import { useRef } from 'react';
import ImageBlock from './ImageBlock';
import ImageLightBox, { ImageLightBoxRef } from './ImageLightBox';
import { ImageToolbarActions } from './ImageToolbar';
import type { ImageMetadata } from '@/types';

interface Props {
  images: ImageMetadata[];
  actions?: ImageToolbarActions;
}
export default function ImageGallery({ images = [], actions }: Props) {
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
            <ImageBlock
              key={id}
              image={wallpaper}
              onViewImage={showLightBox}
              actions={actions}
            />
          );
        })}
      </div>
      <ImageLightBox ref={lightBoxRef} images={images} actions={actions} />
    </>
  );
}
