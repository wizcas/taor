import { ChangeEvent, useContext, useState } from 'react';
import { useDebounce } from 'react-use';
import { WallhavenQueryContext } from './context';
import MaskToggleGroup from '@/components/form/MaskToggleGroup';

const CATEGORY_OPTIONS = [
  { label: 'General', key: 'general' },
  { label: 'Anime', key: 'anime' },
  { label: 'People', key: 'people' },
];

const PURITY_OPTIONS = [
  { label: 'SFW', key: 'sfw' },
  { label: 'Sketchy', key: 'sketchy' },
  { label: 'NSFW', key: 'nsfw' },
];

const RESOLUTIONS = [
  { label: 'Any', value: '' },
  { label: '1440x900', value: '1440x900' },
  { label: '1920x1080 (1080p)', value: '1920x1080' },
  { label: '2560x1004 (2K)', value: '2560x1440' },
  { label: '3840x2160 (4K)', value: '3840x2160' },
];

export default function WallhavenFilters() {
  const [query, updateQuery] = useContext(WallhavenQueryContext);
  const [categories, setCategories] = useState(query?.categories);
  const [purity, setPurity] = useState(query?.purity);
  const [atleast, setAtLeast] = useState(query?.atleast);
  useDebounce(
    () => {
      updateQuery({
        q: query?.q,
        categories,
        purity,
        atleast,
      });
    },
    500,
    [query?.q, categories, purity, atleast, updateQuery]
  );
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
    <div>
      <MaskToggleGroup
        options={CATEGORY_OPTIONS}
        values={categories ?? ''}
        onChange={onMaskGroupChange(setCategories)}
      />
      <MaskToggleGroup
        options={PURITY_OPTIONS}
        values={purity ?? ''}
        onChange={onMaskGroupChange(setPurity)}
      />
      <select value={atleast} onChange={onResolutionChange}>
        {RESOLUTIONS.map(({ label, value }) => (
          <option key={value ?? 'any'} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
