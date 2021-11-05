import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import ImageLoading from './ImageLoading';

interface Props {
  src: string;
  placeholder?: string;
  color?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onLoading?(): void;
  onLoad?(): void;
}
export default function LazyImage(props: Props) {
  const {
    src,
    alt = '',
    color = '#999',
    placeholder,
    className,
    ...rest
  } = props;
  const { imgRef, isLoading } = useAsyncImage(src);
  return (
    <div style={{ backgroundColor: color }} className={className}>
      <img alt={alt} src={placeholder} ref={imgRef} {...rest} />
      <ImageLoading isLoading={isLoading} dark />
    </div>
  );
}

function useAsyncImage(
  src: string,
  onLoad?: () => void,
  onLoading?: () => void
): {
  imgRef: RefObject<HTMLImageElement>;
  isLoading: boolean;
} {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useCallback((src: string) => {
    if (!imgRef.current) return;
    const resultImage = new Image();
    resultImage.onload = () => {
      setIsLoading(false);
      if (imgRef.current) {
        imgRef.current.src = resultImage.src;
      }
      onLoad?.();
    };
    onLoading?.();
    resultImage.src = src;
  }, []);
  useEffect(() => {
    downloadImage(src);
  }, [downloadImage, src]);
  return { imgRef, isLoading };
}
