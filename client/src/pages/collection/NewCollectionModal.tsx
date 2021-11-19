import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { CollectionsContext } from '@/providers';

export default function NewCollectionModal() {
  const [isOpen, setIsOpen] = useState(false);

  const collections = useContext(CollectionsContext);
  collections.creationModal = {
    open() {
      setIsOpen(true);
    },
    close,
  };

  function close() {
    setIsOpen(false);
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={close} shouldCloseOnEsc>
      xxx
    </Modal>
  );
}
