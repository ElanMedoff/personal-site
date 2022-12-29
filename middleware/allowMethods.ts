import { Middleware } from "utils/middlewareHelpers";

export const allowMethods = (allowedMethods: string[]): Middleware => {
  return async function (req, res, next) {
    if (allowedMethods.includes(req.method!) || req.method === "OPTIONS") {
      return next();
    } else {
      return res
        .status(405)
        .send({ type: "error", errorMessage: "method not allowed." });
    }
  };
};
