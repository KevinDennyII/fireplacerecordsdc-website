const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export function getRouterBasePath(): string {
  const basePath = trimTrailingSlash(import.meta.env.BASE_URL);
  return basePath === "" ? "/" : basePath;
}

export function getApiBaseUrl(): string {
  const configuredApiBase = import.meta.env.VITE_API_BASE_URL;
  if (configuredApiBase) {
    return trimTrailingSlash(configuredApiBase);
  }

  return trimTrailingSlash(import.meta.env.BASE_URL);
}
