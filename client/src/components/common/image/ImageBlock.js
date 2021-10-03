import { useMemo, useCallback } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import styles from './ImageBlock.module.css';
import { useImageState } from './useImageState';
import { ImageLoading } from './ImageLoading';
import { ImageError } from './ImageError';

export function ImageBlock(props) {
  const { image, onViewImage } = props;
  const [ref, { width }] = useMeasure();

  const { imgStateProps, isLoading, hasError } = useImageState(image.thumbnail);

  const blockStyle = useMemo(
    () => ({
      height: (width * 9) / 16,
    }),
    [width]
  );

  const thumbnailStyle = useMemo(
    () => ({
      backgroundImage: `url(${image.thumbnail})`,
    }),
    [image.thumbnail]
  );

  const viewImage = useCallback(
    (image) => {
      if (isLoading || hasError) return;
      onViewImage?.(image.raw, image.width, image.height);
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
        onClick={() => viewImage(image)}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <img src={image.thumbnail} alt="" {...imgStateProps} />
          <ImageLoading isLoading={isLoading} />
          <ImageError hasError={hasError} />
        </div>
      </div>
    </>
  );
}
