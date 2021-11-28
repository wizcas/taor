import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (request: VercelRequest, response: VercelResponse) => {
  const { query } = request;
  const name = query.name || 'world';
  response.status(200).end(`Hello ${name}!`);
};
