import { Middleware } from 'koa';

export const cors: Middleware = async (ctx, next) => {
  const { method, response } = ctx;
  response.set('Access-Control-Allow-Origin', '*');
  response.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, Accept'
  );
  response.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  response.set('Access-Control-Allow-Credentials', 'true');
  if (method === 'OPTIONS') {
    ctx.status = 200;
  } else {
    await next();
  }
};
