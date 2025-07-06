const isDev = import.meta.env.DEV;

const ENV = {
  BASE_URL_DEV: import.meta.env.VITE_BASE_URL_DEV,
  BASE_URL_PROD: import.meta.env.VITE_BASE_URL_PROD,
};

export const BASE_URL = isDev ? ENV.BASE_URL_DEV : ENV.BASE_URL_PROD;
