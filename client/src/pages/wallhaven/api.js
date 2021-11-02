import { useQuery } from 'react-query';

const wallhavenAPI = {
  search: 'https://taor-api.vercel.com/api/wallhaven/search',
  searchLocal: 'http://localhost:3000/api/wallhaven/search',
};

export function useWallhavenSearch(query) {
  const url = new URL(wallhavenAPI.searchLocal);
  url.search = new URLSearchParams(query);

  return useQuery(['wallhaven', 'search', query], async () => {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = await resp.json();
    return data.map(({ id, thumbs, path, dimension_x, dimension_y }) => ({
      id,
      thumbnail: thumbs.original,
      raw: path,
      width: dimension_x,
      height: dimension_y,
    }));
  });
}
