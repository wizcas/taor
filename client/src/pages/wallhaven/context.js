import { createContext } from 'react';

export const defaultQuery = {
  // q: 'cat',
  // categories: '111', // general/anime/people
  // purity: '110', // sfw/sketchy/nsfw
  sorting: 'relevance',
  // atleast: resolutionOptions[0],
  ratios: '16x9,16x10',
};

export const WallhavenQueryContext = createContext(defaultQuery);
