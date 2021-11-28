import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

export const cors =
  (fn: VercelApiHandler) => async (req: VercelRequest, res: VercelResponse) => {
    const { method } = req;
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, ' +
        'Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (method === 'OPTIONS') {
      res.status(200).end();
      return undefined;
    }
    return fn(req, res);
  };
