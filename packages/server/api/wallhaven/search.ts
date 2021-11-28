import { WALLHAVEN_ENDPOINTS } from '../../libs/wallhaven';
import { get } from '../../http';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { query } = req;
  const data = await get(WALLHAVEN_ENDPOINTS.search, { params: query });
  res.status(200).json(data);
};
