import { forwardRef, useState, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import { ImageLoading } from './ImageLoading';
import { ImageError } from './ImageError';
import { useImageState } from './useImageState';
import styles from './ImageLightBox.module.css';

function Component(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const { imgStateProps, isLoading, hasError } = useImageState(url);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function open(url) {
    console.log('open raw', url);
    setUrl(url);
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const image = (
    <>
      <div className={styles.image}>
        <img src={url} alt="" referrerPolicy="no-referrer" {...imgStateProps} />
        <ImageLoading isLoading={isLoading} dark={true} />
        <ImageError
          hasError={hasError}
          dark={true}
          message="An error occurs when downloading then wallpaper"
        />
      </div>
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
      <div className={styles.wrapper}>{url && image}</div>
    </Modal>
  );
}

export const ImageLightBox = forwardRef(Component);
