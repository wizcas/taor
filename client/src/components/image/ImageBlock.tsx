import { useMemo, MouseEvent, KeyboardEvent } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../form/CircleButton';
import type { ImageMetadata } from './types';
import useImageState from './useImageState';
import ImageLoading from './ImageLoading';
import ImageError from './ImageError';

import styles from './ImageBlock.module.css';

interface Props {
  image: ImageMetadata;
  onViewImage(image: ImageMetadata): void;
  onSelect(image: ImageMetadata): void;
}

export default function ImageBlock(props: Props) {
  const { image, onViewImage, onSelect } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();

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

  function viewImage() {
    if (isLoading || hasError) return;
    onViewImage?.(image);
  }

  function onApplyClick(e?: MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    e?.stopPropagation();
    onSelect?.(image);
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'Enter':
        onApplyClick();
        break;
      case 'Space':
        viewImage();
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.imageBlockContainer}>
      <div
        role="button"
        tabIndex={0}
        className={classNames(styles.imageBlock, {
          [styles.ready]: !isLoading && !hasError,
        })}
        ref={ref}
        style={blockStyle}
        onClick={() => viewImage()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <img src={image.thumbnail} alt="" {...imgStateProps} />
          <ImageLoading isLoading={isLoading} />
          <ImageError hasError={hasError} />
        </div>
      </div>
      <CircleButton className={styles.button} onClick={onApplyClick}>
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </CircleButton>
    </div>
  );
}
