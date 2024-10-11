import { NextApiRequest, NextApiResponse } from 'next';

export enum EAppError {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

export const handle = <T>(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>) => {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    try {
      res.status(200).json((await handler(req, res)) || {} as any);
    } catch (e: any) {
      console.error(e);

      res.status(500).json({
        success: false,
        ...e,
      } as T);
    }
  };
};

export const getBody = <T>(req: NextApiRequest): T => req.body;
