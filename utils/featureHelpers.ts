import { isProd } from "utils/envHelpers";

const featuresMap: Record<string, { dev: boolean; prod: boolean }> = {
  oauth: { dev: true, prod: true },
  comments: { dev: true, prod: false },
} as const;

export type Feature = keyof typeof featuresMap;

export const isFeatureEnabled = (feature: Feature) => {
  return featuresMap[feature][isProd() ? "prod" : "dev"];
};
