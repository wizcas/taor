import { useQuery } from 'react-query';
import { ImageMetadata } from '../../components/image/types';

export interface WallhavenSearchQuery {
  q?: string;
  categories?: string; // general/anime/people
  purity?: string;
  sorting?: string;
  atleast?: string;
  ratios?: string;
}

export interface WallhavenSearchResult {
  id: string;
  thumbs: {
    large: string;
    original: string;
    small: string;
  };
  path: string;
  dimension_x: number;
  dimension_y: number;
  ratio: string;
}

const wallhavenAPI = {
  search: 'https://taor-api.vercel.com/api/wallhaven/search',
  searchLocal: 'http://localhost:3000/api/wallhaven/search',
};

export function useWallhavenSearch(query: WallhavenSearchQuery | undefined) {
  query ??= {};
  const url = new URL(wallhavenAPI.searchLocal);
  url.search = new URLSearchParams(query as Record<string, string>).toString();

  return useQuery<ImageMetadata[], Error>(
    ['wallhaven', 'search', query],
    async () => {
      const resp = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await resp.json();
      return data.map(
        ({
          id,
          thumbs,
          path,
          dimension_x,
          dimension_y,
        }: WallhavenSearchResult) =>
          ({
            id,
            thumbnail: thumbs.original,
            raw: path,
            width: dimension_x,
            height: dimension_y,
          } as ImageMetadata)
      );
    }
  );
}
