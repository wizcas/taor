import { useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '@/components/modals/Modal';
import { CollectionsContext } from '@/providers';
import { ModalRef } from '@/types';

export default observer(function CollectionEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const collections = useContext(CollectionsContext);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const modal: ModalRef = {
      open() {
        setIsOpen(true);
      },
      close,
    };
    collections.initEditor(modal);
    return () => collections.disposeEditor(modal);
  }, [collections, close]);

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      Editing {collections.editingCollection?.name}
    </Modal>
  );
});
