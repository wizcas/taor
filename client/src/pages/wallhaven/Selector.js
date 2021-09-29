import { useState, useRef } from 'react';
import { MaskToggleGroup } from '../../components/common/form';
import { WallhavenGallery } from './Gallery';
import _debounce from 'lodash/debounce';

import styles from './Selector.module.css';

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
  { label: 'Any', value: undefined },
  { label: '1440x900', value: '1440x900' },
  { label: '1920x1080 (1080p)', value: '1920x1080' },
  { label: '2560x1004 (2K)', value: '2560x1440' },
  { label: '3840x2160 (4K)', value: '3840x2160' },
];
export function WallhavenSelector() {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState('');
  const [purity, setPurity] = useState('');

  const [query, setQuery] = useState({});
  const debounceRef = useRef();

  function updateQuery(values) {
    return setQuery((prev) => ({
      ...prev,
      ...values,
    }));
  }

  function onSearchTextSubmit(e) {
    const q = e.target.value;

    setSearchText(q);
    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
    debounceRef.current = _debounce((q) => {
      updateQuery({ q });
      console.log('debounced q', q);
    }, 500);
    debounceRef.current(q);
  }
  function onMaskGroupChange(setter) {
    return function fn(value) {
      setter(value);
    };
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search by keywords"
          value={searchText}
          onChange={onSearchTextSubmit}
        />
        <MaskToggleGroup
          options={categoryOptions}
          value={categories}
          onChange={onMaskGroupChange((categories) => {
            setCategories(categories);
            updateQuery({ categories });
          })}
        />
        <MaskToggleGroup
          options={purityOptions}
          value={purity}
          onChange={onMaskGroupChange((purity) => {
            setPurity(purity);
            updateQuery({ purity });
          })}
        />
        <select value="3840x2160">
          {resolutions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button>Search</button>
      </section>
      <div className={styles.content}>
        <WallhavenGallery query={query} />
      </div>
    </div>
  );
}
