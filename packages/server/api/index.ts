import Koa from 'koa';
import Router from '@koa/router';
import { cors } from '../libs/middleware';
import wallhaven from '../libs/wallhaven';

const app = new Koa();
const router = new Router({
  prefix: '/api',
});

router.get('', (ctx) => {
  ctx.body = 'taor API';
});
router.get('/hello', (ctx) => {
  ctx.body = 'hello world!';
});

router.use('/wallhaven', wallhaven.routes(), wallhaven.allowedMethods());

app.use(cors).use(router.routes()).use(router.allowedMethods());

export default app;
