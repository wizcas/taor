import { WALLHAVEN_ENDPOINTS } from '../../libs/wallhaven';
import { get } from '../../libs/http';
import middleware from '../../libs/middleware';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default middleware(async (req: VercelRequest, res: VercelResponse) => {
  const { query } = req;
  const data = await get(WALLHAVEN_ENDPOINTS.search, { params: query });
  res.status(200).json(data);
});
