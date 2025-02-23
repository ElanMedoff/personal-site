import { Feature, isFeatureEnabled } from "src/utils/feature";
import { Middleware } from "src/utils/middleware";

export const requireFeatures = (requiredFeatures: Feature[]): Middleware => {
  return async function (_, res, next) {
    if (requiredFeatures.every(isFeatureEnabled)) {
      return next();
    }

    const disabledFeatures = requiredFeatures.filter(
      (feature) => !isFeatureEnabled(feature)
    );

    return res.status(401).send({
      type: "error",
      errorMessage: `feature(s) not enabled: ${disabledFeatures}`,
    });
  };
};
