import { useState, useContext, ChangeEvent, useRef } from 'react';
import { useDebounce } from 'react-use';
import { observer } from 'mobx-react-lite';
import WallhavenSearchResult from './WallhavenSearchResult';
import styles from './WallhavenSettings.module.css';
import WallhavenFilters from './WallhavenFilters';
import type { ModalRef } from '@/types';
import { WallhavenQueryContext } from '@/api/wallhaven';
import DrawerModal from '@/components/modals/DrawerModal';
import Button from '@/components/button/Button';

function WallhavenSettings() {
  const [query, updateQuery] = useContext(WallhavenQueryContext);
  const [q, setQ] = useState(query?.q);

  const filtersRef = useRef<ModalRef>(null);

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
          placeholder="Enter keywords"
          value={q}
          onChange={onSearchTextSubmit}
        />
        <Button onClick={openFilters}>settings</Button>
      </section>
      <WallhavenSearchResult className="overflow-y-auto flex-1" />
      <DrawerModal title="Wallhaven Search Settings" ref={filtersRef}>
        <WallhavenFilters />
      </DrawerModal>
    </div>
  );
}

const ObservedWallhavenSettings = observer(WallhavenSettings);
export default ObservedWallhavenSettings;
