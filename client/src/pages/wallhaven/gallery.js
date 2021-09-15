import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const client = new QueryClient();

export function WallhavenWrapper(props) {
  return (
    <QueryClientProvider client={client}>
      <WallhavenGallery />
    </QueryClientProvider>
  );
}

function WallhavenGallery() {
  const { isLoading, data, error } = useWallhavenSearching();
  if (error) {
    console.error("wallhaven searching failed", error);
  }
  const wallpapers = data?.data ?? [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {wallpapers.map((wallpaper) => (
        <img src={wallpaper.thumbs.original} alt={wallpaper.short_url} />
      ))}
    </div>
  );
}

const resolutionOptions = ["3840x2160"];
const wallhavenAPI = {
  search: "https://taor-api.vercel.com/api/wallhaven/search",
  searchLocal: "http://localhost:3000/api/wallhaven/search",
};

function useWallhavenSearching() {
  const query = {
    q: "cat",
    categories: "110", // general/anime/people
    purity: "110", // sfw/sketchy/nsfw
    sorting: "toplist",
    atleast: resolutionOptions[0],
  };

  const url = new URL(wallhavenAPI.search);
  url.search = new URLSearchParams(query);

  return useQuery(["wallhaven", "search", query], () => {
    console.log("query", url);
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });
}
