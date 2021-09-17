import { useState } from 'react';
import { MaskToggleGroup } from '../../components/common/form';
import { WallhavenGallery } from './gallery';
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
  const [categories, setCategories] = useState('');
  const [purity, setPurity] = useState('');

  function onMaskGroupChange(setter) {
    return function fn(value) {
      setter(value);
    };
  }

  console.log({ categories, purity });

  return (
    <div className={styles.wrapper}>
      <section className={styles.toolbar}>
        <input type="text" placeholder="Search by keywords" />
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
        <WallhavenGallery />
      </div>
    </div>
  );
}
