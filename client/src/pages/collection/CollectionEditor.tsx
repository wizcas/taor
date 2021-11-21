import { useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Modal from '@/components/modals/Modal';
import { CollectionsContext } from '@/providers';
import { ModalRef } from '@/types';
import EditableTextBox from '@/components/form/EditableTextBox';
import ImageGallery from '@/components/image/ImageGallery';
import FeatherIcon from '@/components/icon/FeatherIcon';

export default observer(function CollectionEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const collections = useContext(CollectionsContext);
  const collection = collections.editingCollection;

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

  function onSubmitName(value: string) {
    if (!collection) return;
    collections.rename(collection, value);
  }

  const title = (
    <div className="flex gap-2 items-center">
      <EditableTextBox value={collection?.name} onSubmit={onSubmitName} />
    </div>
  );

  const images = collection?.images ?? [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      title={title}
      subtitle="Manage your collected images"
      className={classNames('w-60vw')}
    >
      {images.length > 0 ? (
        <ImageGallery images={images} actions={['apply', 'remove']} />
      ) : (
        <div
          className={classNames(
            'flex flex-col items-center justify-center gap-2',
            'text-gray-400',
            'p-8'
          )}
        >
          <FeatherIcon icon="circle" />
          <span>No image&rsquo;s been collected yet.</span>
        </div>
      )}
    </Modal>
  );
});
