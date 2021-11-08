import classNames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import Modal from 'react-modal';

interface Props {
  side?: 'left' | 'right';
  children?: ReactNode;
}

export interface DrawerModalRef {
  open: () => void;
  close: () => void;
}

function DrawerModal(props: Props, ref: ForwardedRef<DrawerModalRef>) {
  const { side = 'right', children } = props;
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      close();
    },
  }));

  function close() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      closeTimeoutMS={300}
      className={classNames(
        'drawer',
        side,
        'absolute inset-y-0 h-screen',
        'shadow-2xl',
        'bg-white bg-opacity-80',
        'p-4',
        {
          'left-0': side === 'left',
          'right-0': side === 'right',
        }
      )}
      overlayClassName={classNames(
        'drawer',
        'fixed inset-0',
        'bg-white bg-opacity-75'
      )}
    >
      {children}
    </Modal>
  );
}

const DrawerModalWithRef = forwardRef(DrawerModal);
export default DrawerModalWithRef;
