import { forwardRef, useState, useImperativeHandle, useMemo } from 'react';
import Modal from 'react-modal';
import styles from './ImageLightBox.module.css';

function Component(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [raw, setRaw] = useState('');
  console.log({ raw });

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const imageStyle = useMemo(
    () => ({
      backgroundImage: `url(${raw})`,
    }),
    [raw]
  );

  function open(raw) {
    console.log('open raw', raw);
    setRaw(raw);
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
    >
      <div className={styles.wrapper}>
        {raw && (
          <div className={styles.image} style={imageStyle}>
            <img src={raw} alt="" />
          </div>
        )}
      </div>
    </Modal>
  );
}

export const ImageLightBox = forwardRef(Component);
