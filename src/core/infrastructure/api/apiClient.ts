/**
 * API Client - Centralized HTTP client for future REST integration
 * Interceptors structure ready for JWT, error handling, retry logic
 */

import type { ApiError, ApiResponse } from '@/types';

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 30000;

function buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
  if (!params || Object.keys(params).length === 0) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${searchParams.toString()}`;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const errorData = isJson ? await response.json().catch(() => ({})) : {};
    const apiError: ApiError = {
      code: errorData.code || `HTTP_${response.status}`,
      message: errorData.message || response.statusText,
      details: errorData.details,
    };
    return { success: false, error: apiError };
  }

  if (response.status === 204) {
    return { success: true };
  }

  const data = isJson ? await response.json() : await response.text();
  return { success: true, data: data as T };
}

/**
 * Base fetch wrapper - Replace with axios/fetch interceptors when backend exists
 */
export async function apiClient<T>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, timeout = DEFAULT_TIMEOUT, ...fetchConfig } = config;

  const fullUrl = buildUrl(url, params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullUrl, {
      ...fetchConfig,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchConfig.headers,
      },
    });

    clearTimeout(timeoutId);
    return handleResponse<T>(response);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error.message,
        },
      };
    }
    return {
      success: false,
      error: { code: 'UNKNOWN_ERROR', message: 'An unexpected error occurred' },
    };
  }
}

export const api = {
  get: <T>(url: string, config?: RequestConfig) =>
    apiClient<T>(url, { ...config, method: 'GET' }),
  post: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    apiClient<T>(url, { ...config, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    apiClient<T>(url, { ...config, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    apiClient<T>(url, { ...config, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(url: string, config?: RequestConfig) =>
    apiClient<T>(url, { ...config, method: 'DELETE' }),
};
