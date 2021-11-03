import { useState, useRef, useLayoutEffect } from 'react';

export default function useImageState(src: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const prevSrc = useRef(src);
  useLayoutEffect(() => {
    if (src !== prevSrc.current) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  function onImageLoad() {
    setIsLoading(false);
  }
  function onImageError() {
    onImageLoad();
    setHasError(true);
  }

  return {
    imgStateProps: {
      onLoad: onImageLoad,
      onError: onImageError,
    },
    isLoading,
    hasError,
  };
}
