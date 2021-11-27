import { RequestHandler } from 'express';
import { get } from '../../http';
import wallhavenAPI from './const';

export const search: RequestHandler = async (req, res) => {
  const { query } = req;
  const data = await get(wallhavenAPI.search, { params: query });
  res.status(200).json(data);
};
