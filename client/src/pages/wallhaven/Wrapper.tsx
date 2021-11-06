import useStoredContext from '@/hooks/useStoredContext';
import { defaultQuery, WallhavenQueryContext } from './context';
import WallhavenSettings from './WallhavenSettings';

export default function WallhavenWrapper() {
  const ctx = useStoredContext('wallhaven-search', defaultQuery);
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSettings />
    </WallhavenQueryContext.Provider>
  );
}
