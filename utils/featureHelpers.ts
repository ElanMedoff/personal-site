import { isProd } from "utils/envHelpers";

const featuresMap = {
  resume: { dev: true, prod: true },
} as const;

export type Feature = keyof typeof featuresMap;

export const isFeatureEnabled = (feature: Feature) => {
  return featuresMap[feature][isProd() ? "prod" : "dev"];
};
