import { createContext } from 'react';
import { UseStoredContextReturns } from '@/hooks/useStoredContext';
import { WallhavenSearchQuery } from './api';

export const defaultQuery: WallhavenSearchQuery = {
  q: '',
  categories: '111', // general/anime/people
  purity: '110', // sfw/sketchy/nsfw
  sorting: 'relevance',
  atleast: '',
  ratios: '16x9,16x10',
};

export const WallhavenQueryContext = createContext<
  UseStoredContextReturns<WallhavenSearchQuery>
>(undefined as unknown as UseStoredContextReturns<WallhavenSearchQuery>);
