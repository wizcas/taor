import classNames from 'classnames';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import CollectionBlock from './CollectionBlock';
import NewCollectionBlock from './NewCollectionBlock';
import { CollectionsContext } from '@/providers';
import InfiniteView from '@/components/container/InfiniteView';

interface Props {
  canCreate?: boolean;
}

export default observer(function CollectionList({ canCreate }: Props) {
  const collections = useContext(CollectionsContext);
  return (
    <InfiniteView
      loadMore={collections.loadMore}
      loading={collections.isLoading}
      noMoreText="That's all you have"
    >
      <div className={classNames('grid grid-cols-4 gap-4 m-4')}>
        {canCreate && <NewCollectionBlock />}
        {collections.list.map((collection) => (
          <CollectionBlock key={collection.id} collection={collection} />
        ))}
      </div>
    </InfiniteView>
  );
});
