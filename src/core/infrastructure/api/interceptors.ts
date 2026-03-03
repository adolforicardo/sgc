/**
 * API Interceptors - Structure for request/response transformation
 * Ready for JWT injection, error normalization, logging when backend exists
 */

import type { ApiResponse } from '@/types';

export type RequestInterceptor = (url: string, config: RequestInit) => [string, RequestInit];
export type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

/**
 * Add request interceptor - e.g. for JWT token injection
 */
export function addRequestInterceptor(interceptor: RequestInterceptor): () => void {
  requestInterceptors.push(interceptor);
  return () => {
    const index = requestInterceptors.indexOf(interceptor);
    if (index > -1) requestInterceptors.splice(index, 1);
  };
}

/**
 * Add response interceptor - e.g. for token refresh on 401
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
  responseInterceptors.push(interceptor);
  return () => {
    const index = responseInterceptors.indexOf(interceptor);
    if (index > -1) responseInterceptors.splice(index, 1);
  };
}

/**
 * Apply request interceptors - call before fetch
 */
export function applyRequestInterceptors(url: string, config: RequestInit): [string, RequestInit] {
  let currentUrl = url;
  let currentConfig = config;
  for (const interceptor of requestInterceptors) {
    [currentUrl, currentConfig] = interceptor(currentUrl, currentConfig);
  }
  return [currentUrl, currentConfig];
}

/**
 * Apply response interceptors - call after fetch
 */
export function applyResponseInterceptors<T>(response: ApiResponse<T>): ApiResponse<T> {
  let currentResponse = response;
  for (const interceptor of responseInterceptors) {
    currentResponse = interceptor(currentResponse);
  }
  return currentResponse;
}

/**
 * Example: JWT interceptor (uncomment when backend exists)
 */
// addRequestInterceptor((url, config) => {
//   const token = getStoredToken();
//   if (token) {
//     const headers = new Headers(config.headers);
//     headers.set('Authorization', `Bearer ${token}`);
//     return [url, { ...config, headers }];
//   }
//   return [url, config];
// });
