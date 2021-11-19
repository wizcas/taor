import ReactModal from 'react-modal';
import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.css';
import ModalHeader from './ModalHeader';
import type { Size } from '@/types';

export interface ModalProps extends PropsWithChildren<ReactModal.Props> {
  title?: ReactNode;
  contentClassName?: string;
  titleSize?: Size;
}

export default function Modal({
  title,
  children,
  closeTimeoutMS = 300,
  onRequestClose,
  className,
  overlayClassName,
  titleSize,
  ...rest
}: ModalProps) {
  return (
    <ReactModal
      className={classNames(styles.modal, className)}
      overlayClassName={classNames(styles.overlay, overlayClassName)}
      onRequestClose={onRequestClose}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      {(title || onRequestClose) && (
        <ModalHeader
          title={title}
          size={titleSize}
          onClose={(e) => onRequestClose?.(e)}
        />
      )}
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
}
