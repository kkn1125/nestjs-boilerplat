import { NextFunction, Request, Response } from 'express';

export function InterceptorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.path.match(/^\/.*\.(js|css|ico|png|jpg|jpeg|gif|svg|webp|html|pdf)$/g)
  ) {
    console.log(req.path);
  } else if (!req.path.startsWith('/api')) {
    console.log('🛠️🛠️🛠️🛠️🛠️', req.url);
    req.url = `/views${req.url}`;
    console.log('🛠️🛠️🛠️🛠️🛠️', req.url);
  } else {
    console.log('🛠️🛠️🛠️🛠️🛠️', req.url);
  }
  next();
}
