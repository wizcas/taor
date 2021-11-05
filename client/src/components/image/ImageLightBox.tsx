import { forwardRef, useState, useImperativeHandle, ForwardedRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../form/CircleButton';
import ImageLoading from './ImageLoading';
import ImageError from './ImageError';
import useImageState from './useImageState';
import styles from './ImageLightBox.module.css';
import { ImageMetadata } from './types';

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
  const { imgStateProps, isLoading, hasError } = useImageState(image?.raw);

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
        <img
          src={image.raw}
          width={image.width}
          height={image.height}
          alt=""
          {...imgStateProps}
        />
        <ImageLoading isLoading={isLoading} dark />
        <ImageError
          hasError={hasError}
          dark
          message="An error occurs when downloading then wallpaper"
        />
      </div>
      <CircleButton className={styles.button} onClick={onApplyClick}>
        <FontAwesomeIcon icon={faCheck} size="4x" />
      </CircleButton>
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
