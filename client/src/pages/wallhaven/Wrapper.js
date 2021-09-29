import { useCallback, useMemo, useState } from 'react';
import { defaultQuery, WallhavenQueryContext } from './context';
import { WallhavenSelector } from './Selector';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';

export function WallhavenWrapper() {
  const [query, setQuery] = useState(defaultQuery);
  const updateQuery = useCallback((values) => {
    setQuery((prev) => {
      // remove empty query params
      const finalQuery = _omitBy(
        {
          ...prev,
          ...values,
        },
        (v) => _isNil(v) || v === ''
      );
      return finalQuery;
    });
  }, []);
  const ctx = useMemo(
    () => ({
      query,
      updateQuery,
    }),
    [query, updateQuery]
  );
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSelector />
    </WallhavenQueryContext.Provider>
  );
}
