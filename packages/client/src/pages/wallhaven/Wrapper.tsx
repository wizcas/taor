import WallhavenSettings from './WallhavenSettings';
import { defaultQuery, WallhavenQueryContext } from '@/api/wallhaven';
import useStoredContext from '@/hooks/useStoredContext';

export default function WallhavenWrapper() {
  const ctx = useStoredContext('wallhaven-search', defaultQuery);
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSettings />
    </WallhavenQueryContext.Provider>
  );
}
