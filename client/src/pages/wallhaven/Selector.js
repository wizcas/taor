import { useState, useContext } from 'react';
import { useDebounce } from 'react-use';
import { MaskToggleGroup } from '../../components/common/form';
import { WallhavenGallery } from './Gallery';

import styles from './Selector.module.css';
import { WallhavenQueryContext } from './context';

const categoryOptions = [
  { label: 'General', value: 'general' },
  { label: 'Anime', value: 'anime' },
  { label: 'People', value: 'people' },
];

const purityOptions = [
  { label: 'SFW', value: 'sfw' },
  { label: 'Sketchy', value: 'sketchy' },
  { label: 'NSFW', value: 'nsfw' },
];

const resolutions = [
  { label: 'Any', value: '' },
  { label: '1440x900', value: '1440x900' },
  { label: '1920x1080 (1080p)', value: '1920x1080' },
  { label: '2560x1004 (2K)', value: '2560x1440' },
  { label: '3840x2160 (4K)', value: '3840x2160' },
];
export function WallhavenSelector() {
  const { query, updateQuery } = useContext(WallhavenQueryContext);
  const [q, setQ] = useState(query.q);
  const [categories, setCategories] = useState(query.categories);
  const [purity, setPurity] = useState(query.purity);
  const [atleast, setAtLeast] = useState(query.atleast);

  useDebounce(
    () => {
      updateQuery({
        q,
        categories,
        purity,
        resolution: atleast,
      });
    },
    500,
    [q, categories, purity, atleast, updateQuery]
  );

  function onSearchTextSubmit(e) {
    const value = e.target.value;
    setQ(value);
  }
  function onMaskGroupChange(setter) {
    return function fn(value) {
      setter(value);
    };
  }
  function onResolutionChange(e) {
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
          value={categories}
          onChange={onMaskGroupChange(setCategories)}
        />
        <MaskToggleGroup
          options={purityOptions}
          value={purity}
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
      <div className={styles.content}>
        <WallhavenGallery />
      </div>
    </div>
  );
}
