import { cacheControl } from './cacheControl';
import { cors } from './cors';
import type { VercelApiHandler } from '@vercel/node';
import type { Middleware } from './types';

const MIDDLEWARES: Middleware[] = [cacheControl, cors];

export default (fn: VercelApiHandler) => {
  return MIDDLEWARES.reduce((next, middleware) => {
    return middleware(next);
  }, fn);
};
