import {
  useMemo,
  MouseEvent,
  KeyboardEvent,
  useState,
  useRef,
  CSSProperties,
  useEffect,
} from 'react';
import { useIntersection } from 'react-use';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../form/CircleButton';

import styles from './ImageBlock.module.css';
import LazyImage from './LazyImage';
import type { ImageMetadata } from './types';

const ratio16to9 = 16 / 9;

interface Props {
  image: ImageMetadata;
  onViewImage(image: ImageMetadata): void;
  onSelect(image: ImageMetadata): void;
}

export default function ImageBlock(props: Props) {
  const { image, onViewImage, onSelect } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [preferredHeight, setPreferredHeight] = useState<number | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(containerRef, {});

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }
    const resizeOb = new ResizeObserver((entries) => {
      if (entries.length === 0) {
        return;
      }
      const el = entries[0];

      const h = el.contentRect.width / ratio16to9;
      setPreferredHeight(h);
    });

    const container = containerRef.current;
    resizeOb.observe(container);
    return () => {
      resizeOb.unobserve(container);
    };
  }, []);

  const containerStyle = useMemo<CSSProperties>(
    () => ({ height: preferredHeight }),
    [preferredHeight]
  );

  const thumbnailStyle = useMemo(
    () => ({
      backgroundColor: image.primaryColor,
    }),
    [image.primaryColor]
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

  const block = (
    <>
      <div
        role="button"
        tabIndex={0}
        className={classNames(styles.imageBlock, {
          [styles.ready]: !isLoading,
        })}
        onClick={() => viewImage()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.thumbnail} style={thumbnailStyle}>
          <LazyImage
            className={styles.innerImage}
            src={image.thumbnail}
            onLoading={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
      <CircleButton className={styles.button} onClick={onApplyClick}>
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </CircleButton>
    </>
  );

  return (
    <div
      className={styles.imageBlockContainer}
      ref={containerRef}
      style={containerStyle}
    >
      {intersection?.isIntersecting ? block : null}
    </div>
  );
}
