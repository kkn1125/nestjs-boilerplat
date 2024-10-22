declare global {}
declare namespace Express {
  declare interface Request {
    user: any;
  }
}
