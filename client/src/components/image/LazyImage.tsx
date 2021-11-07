import classNames from 'classnames';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMeasure } from 'react-use';
import ImageLoading from './ImageLoading';

interface Props {
  src: string;
  placeholder?: string;
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
    placeholder,
    className,
    onLoading,
    onLoad,
    width,
    height,
  } = props;
  const { url, isLoading } = useAsyncImage(src, placeholder, onLoad, onLoading);
  const [rootRef, { width: viewWidth }] = useMeasure<HTMLDivElement>();
  const style = useMemo(() => {
    const result = {
      backgroundImage: `url(${url})`,
    } as CSSProperties;
    if (width && viewWidth && height) {
      result.height = (viewWidth * height) / width;
    }
    return result;
  }, [url, width, height, viewWidth]);
  return (
    <div
      className={classNames(
        'bg-clip-border',
        'bg-no-repeat',
        'bg-cover',
        'bg-origin-border',
        'bg-center',
        'object-cover',
        className
      )}
      ref={rootRef}
      style={style}
      aria-label={alt}
    >
      <ImageLoading loading={isLoading} dark />
    </div>
  );
}

function useAsyncImage(
  src: string,
  placeholder: string | undefined,
  onLoad?: () => void,
  onLoading?: () => void
): {
  url: string | undefined;
  isLoading: boolean;
} {
  const [url, setContent] = useState<string | undefined>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useCallback((src: string) => {
    setIsLoading(true);
    const resultImage = new Image();
    resultImage.onload = () => {
      setIsLoading(false);
      setContent(resultImage.src);
      onLoad?.();
    };
    onLoading?.();
    resultImage.src = src;
  }, []);
  useEffect(() => {
    setContent(placeholder);
    downloadImage(src);
  }, [downloadImage, src]);
  return { url, isLoading };
}
