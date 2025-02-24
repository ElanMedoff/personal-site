export const isProd = () => {
  return process.env.NODE_ENV === "production";
};

export const isVisualRegressionTest = () => {
  return process.env.NEXT_PUBLIC_PLAYWRIGHT === "true";
};

export const getClientId = () => {
  return isProd() ? (process.env.CLIENT_ID_PROD ?? "") : (process.env.CLIENT_ID_DEV ?? "");
};

export const getClientSecret = () => {
  return isProd() ? (process.env.CLIENT_SECRET_PROD ?? "") : (process.env.CLIENT_SECRET_DEV ?? "");
};
