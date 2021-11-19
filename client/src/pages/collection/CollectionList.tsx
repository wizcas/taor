import classNames from 'classnames';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import CollectionBlock from './CollectionBlock';
import { CollectionsContext } from '@/providers';
import InfiniteView from '@/components/container/InfiniteView';

export default observer(function CollectionList() {
  const collections = useContext(CollectionsContext);
  const isEmpty = collections.list.length === 0;
  return isEmpty ? (
    <div>Create a new collection</div>
  ) : (
    <InfiniteView
      loadMore={collections.loadMore}
      loading={collections.isLoading}
      noMoreText="That's all you have"
    >
      <div className={classNames('grid grid-cols-4')}>
        {collections.list.map((collection) => (
          <CollectionBlock collection={collection} />
        ))}
      </div>
    </InfiniteView>
  );
});
