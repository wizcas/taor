import classNames from 'classnames';
import { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import CollectionCard from './CollectionCard';
import NewCollectionBlock from './NewCollectionBlock';
import { CollectionsBrowserMode, CollectionsContext } from '@/providers';
import InfiniteView from '@/components/container/InfiniteView';
import { Collection } from '@/api/wallpapers/collections';

interface Props {
  canCreate?: boolean;
  mode?: CollectionsBrowserMode;
}

export default observer(function CollectionList({ canCreate, mode }: Props) {
  const collections = useContext(CollectionsContext);

  const onBlockClick = useCallback(
    async (collection: Collection) => {
      switch (mode) {
        case 'browse':
          break;
        case 'addTo':
          await collections.toggleImageInCollection(collection);
          break;
        default:
          break;
      }
    },
    [mode]
  );

  return (
    <InfiniteView
      loadMore={collections.loadMore}
      loading={collections.isLoading}
      noMoreText="That's all you have"
    >
      <div className={classNames('grid grid-cols-4 gap-4 m-4 <md:grid-cols-2')}>
        {canCreate && <NewCollectionBlock />}
        {collections.list.map((collection) => {
          const inCollection =
            mode === 'addTo' && collections.hasImageIn(collection);
          return (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onClick={onBlockClick}
              isSelected={inCollection}
            />
          );
        })}
      </div>
    </InfiniteView>
  );
});
