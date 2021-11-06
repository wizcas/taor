import { forwardRef, useState, useImperativeHandle, ForwardedRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../form/CircleButton';
import LazyImage from './LazyImage';

import styles from './ImageLightBox.module.css';
import type { ImageMetadata } from '@/types';

interface Props {
  onSelect(image: ImageMetadata): void;
}

export interface ImageLightBoxRef {
  open(image: ImageMetadata): void;
  close(): void;
}

function ImageLightBox(props: Props, ref: ForwardedRef<ImageLightBoxRef>) {
  const { onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<ImageMetadata | undefined>(undefined);

  function open(image: ImageMetadata) {
    setImage(image);
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function onApplyClick() {
    if (image) {
      onSelect?.(image);
    }
    close();
  }

  const content = image && (
    <>
      <div className={styles.content}>
        <LazyImage
          className={styles.image}
          src={image.raw}
          placeholder={image.thumbnail}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className={styles.buttonContainer}>
        <CircleButton onClick={onApplyClick}>
          <FontAwesomeIcon icon={faCheck} size="4x" />
        </CircleButton>
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
    >
      <div className={styles.wrapper}>{content}</div>
    </Modal>
  );
}

const ImageLightBoxWithRef = forwardRef(ImageLightBox);
export default ImageLightBoxWithRef;
