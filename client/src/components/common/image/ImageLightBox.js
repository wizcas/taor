import { forwardRef, useState, useImperativeHandle, useMemo } from 'react';
import Modal from 'react-modal';
import styles from './ImageLightBox.module.css';

function Component(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  console.log({ raw: url });

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const imageStyle = useMemo(
    () => ({
      backgroundImage: `url(${url})`,
    }),
    [url]
  );

  function open(url) {
    console.log('open raw', url);
    setUrl(url);
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles.overlay}
      className={styles.modalContent}
    >
      <div className={styles.wrapper}>
        {url && (
          <div className={styles.image} style={imageStyle}>
            <img src={url} alt="" />
          </div>
        )}
      </div>
    </Modal>
  );
}

export const ImageLightBox = forwardRef(Component);
