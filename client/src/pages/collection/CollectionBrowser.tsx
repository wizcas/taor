import { useContext, useState } from 'react';
import classNames from 'classnames';
import CollectionList from './CollectionList';
import { CollectionsContext } from '@/providers';
import Modal from '@/components/modals/Modal';

interface Props {
  title?: string;
}

export default function CollectionBrowser({ title = 'Collections' }: Props) {
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
    <Modal
      title={title}
      isOpen={isOpen}
      onRequestClose={close}
      className={classNames('w-80vw min-w-600px max-w-900px')}
    >
      <CollectionList />
    </Modal>
  );
}
