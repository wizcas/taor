import {
  useMemo,
  KeyboardEvent,
  useState,
  useRef,
  CSSProperties,
  useEffect,
} from 'react';
import { useIntersection } from 'react-use';
import classNames from 'classnames';
import LazyImage from './LazyImage';
import styles from './ImageBlock.module.css';
import ImageToolbar from './ImageToolbar';
import type { ImageMetadata } from '@/types';

const ratio16to9 = 16 / 9;

interface Props {
  image: ImageMetadata;
  onViewImage(image: ImageMetadata): void;
}

export default function ImageBlock(props: Props) {
  const { image, onViewImage } = props;
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

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'Enter':
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
    </>
  );

  return (
    <div
      className={styles.imageBlockContainer}
      ref={containerRef}
      style={containerStyle}
    >
      {intersection?.isIntersecting ? block : null}
      {!isLoading && <ImageToolbar image={image} className={styles.toolbar} />}
    </div>
  );
}
