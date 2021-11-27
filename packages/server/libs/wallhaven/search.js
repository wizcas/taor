import * as http from '../../http';
import wallhavenAPI from './const';

export default async function search(ctx, next) {
  const { query } = ctx;
  const data = await http.get(wallhavenAPI.search, { params: query });
  ctx.body = data;
  ctx.status = 200;
}
