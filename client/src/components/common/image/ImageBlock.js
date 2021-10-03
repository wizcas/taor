import { useMemo } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import styles from './ImageBlock.module.css';
import { useImageState } from './useImageState';

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
          <img src={thumbnail} alt="" {...imgStateProps} />
        </div>
      </div>
    </>
  );
}
