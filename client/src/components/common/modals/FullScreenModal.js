import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import { ModalHeader } from "./ModalHeader";

function Component(props, ref) {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <ModalHeader title={title} onClose={close} />
      <main>{children}</main>
    </Modal>
  );
}

export const FullScreenModal = forwardRef(Component);
