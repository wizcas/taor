import { RequestHandler } from 'express';

export const cors: RequestHandler = (req, res, next) => {
  const { method } = req;
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  });
  if (method === 'OPTIONS') {
    res.status(200);
  } else {
    next();
  }
};
