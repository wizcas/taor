import { useCallback, useMemo, useState } from 'react';
import { defaultQuery, WallhavenQueryContext } from './context';
import { WallhavenSelector } from './Selector';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import { useLocalStorage } from 'react-use';

export function WallhavenWrapper() {
  const [storedQuery, setStoredQuery] = useLocalStorage(
    'wallhaven-search',
    defaultQuery
  );
  const [query, setQuery] = useState(storedQuery);
  const updateQuery = useCallback(
    (values) => {
      setQuery((prev) => {
        // remove empty query params
        const finalQuery = _omitBy(
          {
            ...prev,
            ...values,
          },
          (v) => _isNil(v) || v === ''
        );
        setStoredQuery(finalQuery);
        return finalQuery;
      });
    },
    [setStoredQuery]
  );
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
