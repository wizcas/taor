import { useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Gallery } from '../../components/wallpaper/Gallery';
import { WallhavenQueryContext } from './context';

const client = new QueryClient();

export function WallhavenGallery() {
  return (
    <QueryClientProvider client={client}>
      <WallhavenGalleryContent />
    </QueryClientProvider>
  );
}

function WallhavenGalleryContent() {
  const { query } = useContext(WallhavenQueryContext);

  const { isLoading, data, error } = useWallhavenSearching(query);
  if (error) {
    console.error('wallhaven searching failed', error);
  }
  const wallpapers = data?.data ?? [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Gallery
        wallpapers={wallpapers.map((w) => ({
          id: w.id,
          thumbnail: w.thumbs.original,
          raw: w.path,
        }))}
      />
    </div>
  );
}

const wallhavenAPI = {
  search: 'https://taor-api.vercel.com/api/wallhaven/search',
  searchLocal: 'http://localhost:3000/api/wallhaven/search',
};

function useWallhavenSearching(query) {
  const url = new URL(wallhavenAPI.searchLocal);
  url.search = new URLSearchParams(query);

  return useQuery(['wallhaven', 'search', query], () => {
    console.log('<searching on wallhaven>', url.host, query);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  });
}
