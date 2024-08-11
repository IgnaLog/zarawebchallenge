export const ensureHttps = (url: string) => {
  return url.replace(/^http:\/\//i, "https://");
};
