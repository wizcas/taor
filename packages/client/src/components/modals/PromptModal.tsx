import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import Button from '../button/Button';
import Modal from './Modal';

export interface PromptModalProps {
  title?: string;
  content?: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?(): void;
  onCancel?(): void;
}
export interface PromptModalRef {
  close(): void;
}
export default forwardRef(
  (
    {
      title,
      content,
      okText = 'OK',
      cancelText = 'Cancel',
      onOk,
      onCancel,
    }: PromptModalProps,
    ref: ForwardedRef<PromptModalRef>
  ) => {
    const [isOpen, setIsOpen] = useState(true);
    useImperativeHandle(ref, () => ({
      close() {
        setIsOpen(false);
      },
    }));
    return (
      <Modal
        title={title}
        isOpen={isOpen}
        onRequestClose={onCancel || onOk}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
      >
        <div className="py-8">{content}</div>
        <div className="flex flex-row justify-end items-center gap-2 py-1">
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onOk} variant="primary">
            {okText}
          </Button>
        </div>
      </Modal>
    );
  }
);
