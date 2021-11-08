import classNames from 'classnames';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDebounce, useMeasure } from 'react-use';
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
  const { url, loading } = useAsyncImage(src, placeholder, onLoad, onLoading);
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
      <ImageLoading loading={loading} dark />
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
  loading: boolean;
} {
  const [url, setContent] = useState<string | undefined>(placeholder);
  const [loading, setLoading] = useState(false);
  const [debouncedLoading, setDebouncedLoading] = useState(false);

  // debouncing the loading state to prevent spinner flickering
  const [, cancelDebounce] = useDebounce(
    () => {
      setDebouncedLoading(loading);
    },
    100,
    [loading]
  );

  const downloadImage = useCallback((src: string) => {
    setLoading(true);
    const resultImage = new Image();
    resultImage.onload = () => {
      setLoading(false);
      setContent(resultImage.src);
      onLoad?.();
    };
    onLoading?.();
    resultImage.src = src;
    // returns a cancel function that do not update the image
    // element after loaded;
    return () => {
      resultImage.onload = null;
    };
  }, []);
  useEffect(() => {
    setContent(placeholder);
    const cancelDownload = downloadImage(src);
    return () => {
      cancelDebounce();
      cancelDownload();
    };
  }, [downloadImage, src, cancelDebounce]);
  return { url, loading: debouncedLoading };
}
