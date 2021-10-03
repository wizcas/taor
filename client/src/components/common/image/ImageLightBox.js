import { forwardRef, useState, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import { ImageLoading } from './ImageLoading';
import { ImageError } from './ImageError';
import { useImageState } from './useImageState';
import { ApplyButton } from '../form/ApplyButton';
import styles from './ImageLightBox.module.css';

function Component(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(undefined);
  const { imgStateProps, isLoading, hasError } = useImageState(image);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function open(url, width, height) {
    setImage({ url, width, height });
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const content = image && (
    <>
      <div className={styles.content}>
        <img
          src={image.url}
          width={image.width}
          height={image.height}
          alt=""
          referrerPolicy="no-referrer"
          {...imgStateProps}
        />
        <ImageLoading isLoading={isLoading} dark={true} />
        <ImageError
          hasError={hasError}
          dark={true}
          message="An error occurs when downloading then wallpaper"
        />
      </div>
      <ApplyButton className={styles.button}>Select</ApplyButton>
    </>
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles.overlay}
      className={styles.modalContent}
    >
      <div className={styles.wrapper}>{content}</div>
    </Modal>
  );
}

export const ImageLightBox = forwardRef(Component);
