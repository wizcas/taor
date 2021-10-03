import { useMemo, useCallback } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import styles from './ImageBlock.module.css';
import { useImageState } from './useImageState';
import { ImageLoading } from './ImageLoading';
import { ImageError } from './ImageError';

export function ImageBlock(props) {
  const { thumbnail, raw, onViewImage } = props;
  const [ref, { width }] = useMeasure();

  const { imgStateProps, isLoading, hasError } = useImageState(thumbnail);

  const blockStyle = useMemo(
    () => ({
      height: (width * 9) / 16,
    }),
    [width]
  );

  const thumbnailStyle = useMemo(
    () => ({
      backgroundImage: `url(${thumbnail})`,
    }),
    [thumbnail]
  );

  const viewImage = useCallback(
    (url) => {
      if (isLoading || hasError) return;
      onViewImage?.(url);
    },
    [isLoading, hasError, onViewImage]
  );

  return (
    <>
      <div
        className={classNames(styles.imageBlock, {
          [styles.ready]: !isLoading && !hasError,
        })}
        ref={ref}
        style={blockStyle}
        onClick={() => viewImage(raw)}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <img src={thumbnail} alt="" {...imgStateProps} />
          <ImageLoading isLoading={isLoading} />
          <ImageError hasError={hasError} />
        </div>
      </div>
    </>
  );
}
