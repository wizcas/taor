import { useContext, useState } from 'react';
import classNames from 'classnames';
import CollectionList from './CollectionList';
import {
  CollectionsBrowserArgs,
  CollectionsBrowserMode,
  CollectionsContext,
} from '@/providers';
import Modal from '@/components/modals/Modal';

export default function CollectionBrowser() {
  const [isOpen, setIsOpen] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [mode, setMode] = useState<CollectionsBrowserMode>('browse');

  const collections = useContext(CollectionsContext);
  collections.initBrowser({
    open(args: CollectionsBrowserArgs) {
      setIsOpen(true);
      setCanCreate(!!args?.canCreate);
      setMode(args?.mode ?? 'browse');
    },
    close,
  });

  function close() {
    setIsOpen(false);
  }
  return (
    <Modal
      title={mode === 'browse' ? 'Collections' : 'Add to collection'}
      isOpen={isOpen}
      onRequestClose={close}
      className={classNames('w-80vw min-w-600px max-w-900px')}
    >
      <CollectionList canCreate={canCreate} mode={mode} />
    </Modal>
  );
}
