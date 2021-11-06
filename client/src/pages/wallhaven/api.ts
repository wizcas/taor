import { useQuery } from 'react-query';
import type { ImageList, ImageMetadata, Pagination } from '@/types';

export interface WallhavenSearchQuery {
  q?: string;
  categories?: string; // general/anime/people
  purity?: string;
  sorting?: string;
  atleast?: string;
  ratios?: string;
}

interface WallhavenSearchData {
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
  colors: string[];
}
interface WallhavenSearchMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query?: string;
  seed?: string;
}
interface WallhavenSearchResult {
  data: WallhavenSearchData[];
  meta: WallhavenSearchMeta;
}

const wallhavenAPI = {
  remote: 'https://taor-api.vercel.com/api/wallhaven/search',
  local: 'http://localhost:3000/api/wallhaven/search',
  official: 'https://wallhaven.cc/api/v1/search',
};

export function useWallhavenSearch(query: WallhavenSearchQuery | undefined) {
  query ??= {};
  const url = new URL(wallhavenAPI.local);
  // const url = new URL(wallhavenAPI.remote);
  // const url = new URL(wallhavenAPI.official);
  url.search = new URLSearchParams(query as Record<string, string>).toString();

  return useQuery<ImageList, Error>(
    ['wallhaven', 'search', query],
    async () => {
      const resp = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data, meta } = (await resp.json()) as WallhavenSearchResult;
      const images: ImageMetadata[] = data.map(
        ({ id, thumbs, path, dimension_x, dimension_y, colors }) => ({
          id,
          thumbnail: thumbs.small,
          raw: path,
          width: dimension_x,
          height: dimension_y,
          primaryColor: colors[0],
        })
      );
      const pagination: Pagination = {
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        perPage: meta.per_page,
        total: meta.total,
      };
      return { images, pagination };
    }
  );
}
