import { isProd } from "src/utils/env";

const featuresMap = {} as const;

export type Feature = keyof typeof featuresMap;

export const isFeatureEnabled = (feature: Feature) => {
  return featuresMap[feature][isProd() ? "prod" : "dev"];
};
