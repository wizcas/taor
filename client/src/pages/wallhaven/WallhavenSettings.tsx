import { useState, useContext, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { observer } from 'mobx-react-lite';
import { WallhavenQueryContext } from './context';
import WallhavenSearchResult from './WallhavenSearchResult';
import styles from './WallhavenSettings.module.css';
import MaskToggleGroup from '@/components/form/MaskToggleGroup';

const categoryOptions = [
  { label: 'General', key: 'general' },
  { label: 'Anime', key: 'anime' },
  { label: 'People', key: 'people' },
];

const purityOptions = [
  { label: 'SFW', key: 'sfw' },
  { label: 'Sketchy', key: 'sketchy' },
  { label: 'NSFW', key: 'nsfw' },
];

const resolutions = [
  { label: 'Any', value: '' },
  { label: '1440x900', value: '1440x900' },
  { label: '1920x1080 (1080p)', value: '1920x1080' },
  { label: '2560x1004 (2K)', value: '2560x1440' },
  { label: '3840x2160 (4K)', value: '3840x2160' },
];
function WallhavenSettings() {
  const [query, updateQuery] = useContext(WallhavenQueryContext);
  const [q, setQ] = useState(query?.q);
  const [categories, setCategories] = useState(query?.categories);
  const [purity, setPurity] = useState(query?.purity);
  const [atleast, setAtLeast] = useState(query?.atleast);

  useDebounce(
    () => {
      updateQuery({
        q,
        categories,
        purity,
        atleast,
      });
    },
    500,
    [q, categories, purity, atleast, updateQuery]
  );

  function onSearchTextSubmit(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setQ(value);
  }
  function onMaskGroupChange(setter: (value: string) => void) {
    return function fn(value: string) {
      setter(value);
    };
  }
  function onResolutionChange(e: ChangeEvent<HTMLSelectElement>) {
    const atleast = e.target.value;
    setAtLeast(atleast);
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
        <MaskToggleGroup
          options={categoryOptions}
          values={categories ?? ''}
          onChange={onMaskGroupChange(setCategories)}
        />
        <MaskToggleGroup
          options={purityOptions}
          values={purity ?? ''}
          onChange={onMaskGroupChange(setPurity)}
        />
        <select value={atleast} onChange={onResolutionChange}>
          {resolutions.map(({ label, value }) => (
            <option key={value ?? 'any'} value={value}>
              {label}
            </option>
          ))}
        </select>
      </section>
      <WallhavenSearchResult className="overflow-y-auto flex-1" />
    </div>
  );
}

const ObservedWallhavenSettings = observer(WallhavenSettings);
export default ObservedWallhavenSettings;
