import { Feature, isFeatureEnabled } from "utils/featureHelpers";
import { Middleware } from "utils/middlewareHelpers";

export const requireFeatures = (requiredFeatures: Feature[]): Middleware => {
  return async function (_, res, next) {
    if (requiredFeatures.every(isFeatureEnabled)) {
      next();
    } else {
      const disabledFeatures = requiredFeatures.filter(
        (feature) => !isFeatureEnabled(feature)
      );

      res.status(401).send({
        type: "error",
        errorMessage: `feature(s) not enabled: ${disabledFeatures}`,
      });
    }
  };
};
