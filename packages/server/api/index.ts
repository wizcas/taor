import express from 'express';
import { cacheControl, cors } from '../libs/middleware';
// import wallhaven from '../libs/wallhaven';

console.log(express.toString());

const app = express();

app.use(cors).use(cacheControl);

app.get('/api/hello', (req, res) => {
  const { query } = req;
  const name = query.name || 'world';
  res.end(`Hello ${name}!`);
});
// app.use('/api/wallhaven', wallhaven);

export default app;
