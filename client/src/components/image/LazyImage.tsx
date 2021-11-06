import { useCallback, useEffect, useState } from 'react';
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
    ...rest
  } = props;
  const { content, isLoading } = useAsyncImage(
    src,
    placeholder,
    onLoad,
    onLoading
  );
  return (
    <div className={className}>
      {content && (
        <img alt={alt} src={content} className="w-full h-full" {...rest} />
      )}
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
  content: string | undefined;
  isLoading: boolean;
} {
  const [content, setContent] = useState<string | undefined>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const downloadImage = useCallback((src: string) => {
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
  return { content, isLoading };
}
