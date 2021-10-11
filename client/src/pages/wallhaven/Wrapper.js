import { defaultQuery, WallhavenQueryContext } from './context';
import { WallhavenSelector } from './Selector';
import { useStoredContext } from '../../hooks/useStoredContext';

export function WallhavenWrapper() {
  const ctx = useStoredContext('wallhaven-search', defaultQuery);
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSelector />
    </WallhavenQueryContext.Provider>
  );
}
