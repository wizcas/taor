import { useCallback, useContext, useEffect, useState } from 'react';
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

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const modal = {
      open(args: CollectionsBrowserArgs) {
        setIsOpen(true);
        setCanCreate(!!args?.canCreate);
        setMode(args?.mode ?? 'browse');
      },
      close,
    };
    collections.initBrowser(modal);
    return () => collections.disposeBrowser(modal);
  }, [collections, close]);

  const title = mode === 'browse' ? 'Browse Collections' : 'Add to collections';
  const subtitle =
    mode === 'browse'
      ? undefined
      : 'Click on the cards to collect the wallpaper';

  return (
    <Modal
      title={title}
      subtitle={subtitle}
      isOpen={isOpen}
      onRequestClose={close}
      className={classNames('w-80vw min-w-600px max-w-900px')}
    >
      <CollectionList canCreate={canCreate} mode={mode} />
    </Modal>
  );
}
