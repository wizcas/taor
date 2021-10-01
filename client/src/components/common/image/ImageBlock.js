import { useState, useMemo, useRef } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import styles from './ImageBlock.module.css';

export function ImageBlock(props) {
  const { thumbnail, raw, onViewImage } = props;
  const [ref, { width }] = useMeasure();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();

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

  function onImageLoad() {
    setIsLoading(false);
  }
  function onImageError() {
    onImageLoad();
    setHasError(true);
  }
  function viewImage() {
    onViewImage?.(raw);
  }

  return (
    <>
      <div
        className={classNames(styles.imageBlock, {
          [styles.loading]: isLoading,
          [styles.error]: hasError,
        })}
        ref={ref}
        style={blockStyle}
        onClick={viewImage}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <img
            src={thumbnail}
            alt=""
            onLoad={onImageLoad}
            onError={onImageError}
          />
        </div>
      </div>
    </>
  );
}
