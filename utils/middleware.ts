// forked from https://github.com/KolbySisk/next-api-route-middleware
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/api/types";

export type Next = () => Promise<void>;

export type Middleware<RequestT extends NextApiRequest = NextApiRequest> = (
  req: RequestT,
  res: NextApiResponse<ApiResponse<any>>,
  next: Next
) => Promise<void>;

export function withMiddlware<RequestT extends NextApiRequest>(
  ...middlewares: Middleware<RequestT>[]
) {
  return async function internalHandler(req: RequestT, res: NextApiResponse) {
    await runMiddlewares<RequestT>(req, res, middlewares, 0);
  };
}

async function runMiddlewares<RequestT extends NextApiRequest>(
  req: RequestT,
  res: NextApiResponse,
  middlewares: Middleware<RequestT>[],
  currentMiddlewareIndex: number
) {
  if (res.headersSent) return;

  const next = async () => {
    const nextMiddleware = middlewares[currentMiddlewareIndex + 1];
    if (!nextMiddleware) return;

    await runMiddlewares(req, res, middlewares, currentMiddlewareIndex + 1);
  };

  await middlewares[currentMiddlewareIndex](req, res, next);
}
