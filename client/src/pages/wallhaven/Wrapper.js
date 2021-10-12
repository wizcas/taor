import { defaultQuery, WallhavenQueryContext } from './context';
import { WallhavenSettings } from './Settings';
import { useStoredContext } from '../../hooks/useStoredContext';

export function WallhavenWrapper() {
  const ctx = useStoredContext('wallhaven-search', defaultQuery);
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSettings />
    </WallhavenQueryContext.Provider>
  );
}
