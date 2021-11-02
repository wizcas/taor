import { useMemo, useCallback } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useImageState } from './useImageState';
import { ImageLoading } from './ImageLoading';
import { ImageError } from './ImageError';
import { ApplyButton } from '../form/CircleButton';

import styles from './ImageBlock.module.css';

export function ImageBlock(props) {
  const { image, onViewImage, onSelect } = props;
  const [ref, { width }] = useMeasure();

  const { imgStateProps, isLoading, hasError } = useImageState(image.thumbnail);

  const blockStyle = useMemo(
    () => ({
      height: (width * 9) / 16,
    }),
    [width],
  );

  const thumbnailStyle = useMemo(
    () => ({
      backgroundImage: `url(${image.thumbnail})`,
    }),
    [image.thumbnail],
  );

  const viewImage = useCallback(
    (image) => {
      if (isLoading || hasError) return;
      onViewImage?.(image.raw, image.width, image.height);
    },
    [isLoading, hasError, onViewImage],
  );
  function onApplyClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onSelect?.(image.raw);
  }

  return (
    <div className={styles.imageBlockContainer}>
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
      <ApplyButton className={styles.button} onClick={onApplyClick}>
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </ApplyButton>
    </div>
  );
}
