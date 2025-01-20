export const config = {
  isDev: import.meta.env.MODE !== 'development',
  isSSREnabled: import.meta.env.SSR,
};
