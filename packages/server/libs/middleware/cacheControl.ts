import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

export const cacheControl =
  (fn: VercelApiHandler) => async (req: VercelRequest, res: VercelResponse) => {
    const lifetime = 60 * 10; // 10 min
    res.setHeader(
      'Cache-Control',
      `s-max-age=${lifetime}, stale-while-revalidate`
    );
    return fn(req, res);
  };
