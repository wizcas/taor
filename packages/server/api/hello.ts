import middleware from '../libs/middleware';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default middleware((req: VercelRequest, res: VercelResponse) => {
  const { query } = req;
  const name = query.name || 'world';
  res.status(200).end(`Hello ${name}!`);
});
