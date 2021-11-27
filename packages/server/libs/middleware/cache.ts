import { RequestHandler } from 'express';

export const cacheControl: RequestHandler = (_, res, next) => {
  const lifetime = 60 * 10; // 10 min
  res.setHeader(
    'Cache-Control',
    `s-max-age=${lifetime}, stale-while-revalidate`
  );
  next();
};
