import ReactModal from 'react-modal';
import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.css';
import ModalHeader from './ModalHeader';

export interface ModalProps extends PropsWithChildren<ReactModal.Props> {
  title?: ReactNode;
  subtitle?: ReactNode;
  contentClassName?: string;
}

export default function Modal({
  title,
  subtitle,
  children,
  closeTimeoutMS = 300,
  onRequestClose,
  className,
  overlayClassName,
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
          subtitle={subtitle}
          onClose={(e) => onRequestClose?.(e)}
        />
      )}
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
}
