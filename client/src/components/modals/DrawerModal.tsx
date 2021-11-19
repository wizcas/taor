import classNames from 'classnames';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import Modal, { ModalProps } from './Modal';
import type { ModalRef } from '@/types';

interface Props extends Pick<ModalProps, 'title' | 'children'> {
  side?: 'left' | 'right';
}

function DrawerModal(
  { title, side = 'right', children }: Props,
  ref: ForwardedRef<ModalRef>
) {
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
      title={title}
      isOpen={isOpen}
      onRequestClose={close}
      closeTimeoutMS={300}
      className={classNames(
        'drawer',
        side,
        'absolute inset-y-0 h-screen',
        'rounded-none',
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
