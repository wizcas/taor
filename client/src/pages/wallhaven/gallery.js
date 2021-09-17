import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Gallery } from '../../components/wallpaper/Gallery';

const client = new QueryClient();

export function WallhavenGallery(props) {
  return (
    <QueryClientProvider client={client}>
      <WallhavenGalleryContent />
    </QueryClientProvider>
  );
}

function WallhavenGalleryContent() {
  const { isLoading, data, error } = useWallhavenSearching();
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

const resolutionOptions = ['3840x2160'];
const wallhavenAPI = {
  search: 'https://taor-api.vercel.com/api/wallhaven/search',
  searchLocal: 'http://localhost:3000/api/wallhaven/search',
};

function useWallhavenSearching() {
  const query = {
    q: 'cat',
    categories: '111', // general/anime/people
    purity: '110', // sfw/sketchy/nsfw
    sorting: 'relevance',
    atleast: resolutionOptions[0],
    ratios: '16x9,16x10',
  };

  const url = new URL(wallhavenAPI.searchLocal);
  url.search = new URLSearchParams(query);

  return useQuery(['wallhaven', 'search', query], () => {
    console.log('query', url);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  });
}
