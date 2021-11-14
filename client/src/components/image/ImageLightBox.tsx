import {
  forwardRef,
  useState,
  useImperativeHandle,
  ForwardedRef,
  useMemo,
  MouseEvent,
  useEffect,
} from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import LazyImage from './LazyImage';

import styles from './ImageLightBox.module.css';
import ImageToolbar from './ImageToolbar';
import type { ImageMetadata } from '@/types';
import FeatherIcon from '../icon/FeatherIcon';

interface Props {
  images?: ImageMetadata[];
}

export interface ImageLightBoxRef {
  open(image: ImageMetadata): void;
  close(): void;
}

interface NavigationContext {
  nextImage?: ImageMetadata;
  prevImage?: ImageMetadata;
}

function ImageLightBox(props: Props, ref: ForwardedRef<ImageLightBoxRef>) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<ImageMetadata | undefined>(undefined);

  const { images } = props;
  const { prevImage, nextImage } = useMemo<NavigationContext>(() => {
    if (!images) return {};
    const index = image ? images.indexOf(image) : -1;
    if (index < 0) {
      return {};
    }
    return {
      nextImage: index < images.length - 1 ? images[index + 1] : undefined,
      prevImage: index > 0 ? images[index - 1] : undefined,
    };
  }, [images, image]);

  function open(image: ImageMetadata) {
    setImage(image);
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function next() {
    if (nextImage) {
      open(nextImage);
    }
  }
  function prev() {
    if (prevImage) {
      open(prevImage);
    }
  }
  function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowRight':
        next();
        break;
      default:
        break;
    }
  }
  function onNavigate(fn: () => void) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fn();
    };
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const content = image && (
    <>
      <div role="presentation" className={styles.content}>
        <LazyImage
          className={styles.image}
          src={image.raw}
          placeholder={image.thumbnail}
          width={image.width}
          height={image.height}
        />
        {prevImage && (
          <button
            type="button"
            className={classNames(styles.navigation, 'left-0')}
            onClick={onNavigate(prev)}
          >
            <FeatherIcon icon="chevron-left" size="64px" />
          </button>
        )}
        {nextImage && (
          <button
            type="button"
            className={classNames(styles.navigation, 'right-0')}
            onClick={onNavigate(next)}
          >
            <FeatherIcon icon="chevron-right" size="64px" />
          </button>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <ImageToolbar image={image} onSetWallpaper={close} />
      </div>
    </>
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName={styles.overlay}
      className={styles.modalContent}
      closeTimeoutMS={300}
    >
      <div role="presentation" className={styles.wrapper} onClick={close}>
        {content}
      </div>
    </Modal>
  );
}

const ImageLightBoxWithRef = forwardRef(ImageLightBox);
export default ImageLightBoxWithRef;
