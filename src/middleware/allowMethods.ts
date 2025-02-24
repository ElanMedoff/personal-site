import { Middleware } from "src/utils/middleware";

export const allowMethods = (allowedMethods: string[]): Middleware => {
  return async function (req, res, next) {
    if (!req.method) {
      return res
        .status(500)
        .send({ type: "error", errorMessage: "no method on the request object" });
    }

    if (allowedMethods.includes(req.method) || req.method === "OPTIONS") {
      return next();
    }

    return res.status(405).send({ type: "error", errorMessage: "method not allowed." });
  };
};
