import { isProd } from "utils/envHelpers";

const featuresMap: Record<string, { dev: boolean; prod: boolean }> = {
  oauth: { dev: true, prod: true },
  comments: { dev: true, prod: false },
} as const;

export type Feature = keyof typeof featuresMap;

export const isFeatureEnabled = (feature: Feature) => {
  return isProd() ? featuresMap[feature].prod : featuresMap[feature].dev;
};
