import { useState, useContext, ChangeEvent, useRef } from 'react';
import { useDebounce } from 'react-use';
import { observer } from 'mobx-react-lite';
import { WallhavenQueryContext } from './context';
import WallhavenSearchResult from './WallhavenSearchResult';
import styles from './WallhavenSettings.module.css';
import WallhavenFilters from './WallhavenFilters';
import DrawerModal, { DrawerModalRef } from '@/components/modals/DrawerModal';

function WallhavenSettings() {
  const [query, updateQuery] = useContext(WallhavenQueryContext);
  const [q, setQ] = useState(query?.q);

  const filtersRef = useRef<DrawerModalRef>(null);

  useDebounce(() => updateQuery({ q }), 500, [q, updateQuery]);

  function onSearchTextSubmit(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setQ(value);
  }

  function openFilters() {
    filtersRef.current?.open();
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search by keywords"
          value={q}
          onChange={onSearchTextSubmit}
        />
        <button type="button" onClick={openFilters}>
          settings
        </button>
      </section>
      <WallhavenSearchResult className="overflow-y-auto flex-1" />
      <DrawerModal ref={filtersRef}>
        <WallhavenFilters />
      </DrawerModal>
    </div>
  );
}

const ObservedWallhavenSettings = observer(WallhavenSettings);
export default ObservedWallhavenSettings;
