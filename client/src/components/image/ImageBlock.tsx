import { useMemo, MouseEvent, KeyboardEvent, useState } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../form/CircleButton';

import styles from './ImageBlock.module.css';
import LazyImage from './LazyImage';
import type { ImageMetadata } from './types';

interface Props {
  image: ImageMetadata;
  onViewImage(image: ImageMetadata): void;
  onSelect(image: ImageMetadata): void;
}

export default function ImageBlock(props: Props) {
  const { image, onViewImage, onSelect } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [isLoading, setIsLoading] = useState(false);

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
          [styles.ready]: !isLoading,
        })}
        ref={ref}
        style={blockStyle}
        onClick={() => viewImage()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <LazyImage
            src={image.thumbnail}
            color={image.primaryColor}
            onLoading={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
      <CircleButton className={styles.button} onClick={onApplyClick}>
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </CircleButton>
    </div>
  );
}
