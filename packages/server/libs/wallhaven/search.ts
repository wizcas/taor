import { Context } from 'koa';
import { get } from '../../http';
import wallhavenAPI from './const';

export default async function search(ctx: Context) {
  const { query } = ctx;
  const data = await get(wallhavenAPI.search, { params: query });
  ctx.body = data;
  ctx.status = 200;
}
