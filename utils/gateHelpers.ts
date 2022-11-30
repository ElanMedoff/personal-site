import { isProd } from "utils/envHelpers";

const features = { oauth: { dev: true, prod: false } } as const;

type Feature = keyof typeof features;

export const isFeatureEnabled = (feature: Feature) => {
  return isProd() ? features[feature].prod : features[feature].dev;
};
