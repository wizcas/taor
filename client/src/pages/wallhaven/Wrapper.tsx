import { defaultQuery, WallhavenQueryContext } from './context';
import WallhavenSettings from './WallhavenSettings';
import useStoredContext from '../../hooks/useStoredContext';

export default function WallhavenWrapper() {
  const ctx = useStoredContext('wallhaven-search', defaultQuery);
  return (
    <WallhavenQueryContext.Provider value={ctx}>
      <WallhavenSettings />
    </WallhavenQueryContext.Provider>
  );
}
