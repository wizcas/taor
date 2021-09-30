import { useQuery } from 'react-query';

const wallhavenAPI = {
  search: 'https://taor-api.vercel.com/api/wallhaven/search',
  searchLocal: 'http://localhost:3000/api/wallhaven/search',
};

export function useWallhavenSearch(query) {
  const url = new URL(wallhavenAPI.searchLocal);
  url.search = new URLSearchParams(query);

  return useQuery(['wallhaven', 'search', query], () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  });
}
