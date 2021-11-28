import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

export type Middleware = (
  fn: VercelApiHandler
) => (req: VercelRequest, res: VercelResponse) => Promise<void>;
