import { useState, useRef, useEffect } from 'react';
import { MaskToggleGroup } from '../../components/common/form';
import { WallhavenGallery } from './Gallery';
import _debounce from 'lodash/debounce';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';

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
  const [q, setQ] = useState('');
  const [categories, setCategories] = useState('');
  const [purity, setPurity] = useState('');
  const [resolution, setResolution] = useState('');

  const [query, setQuery] = useState({});
  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
    debounceRef.current = _debounce(() => {
      setQuery((prev) => {
        const finalQuery = _omitBy(
          {
            ...prev,
            q,
            categories,
            purity,
            resolution,
          },
          (v) => _isNil(v) || v === ''
        );
        console.log('debounced query', finalQuery);
        return finalQuery;
      });
    }, 500);
    debounceRef.current();
  }, [q, categories, purity, resolution]);

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
    console.log(e, e.target.value);
    const atleast = e.target.value;
    setResolution(atleast);
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
        <select value={resolution} onChange={onResolutionChange}>
          {resolutions.map(({ label, value }) => (
            <option key={value ?? 'any'} value={value}>
              {label}
            </option>
          ))}
        </select>
      </section>
      <div className={styles.content}>
        <WallhavenGallery query={query} />
      </div>
    </div>
  );
}
