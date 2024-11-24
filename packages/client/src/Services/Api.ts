export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type FetchData = Record<string, unknown>

export type FetchOptions = {
  method?: METHODS
  data?: unknown
  headers?: Record<string, string>
  timeout?: number
  contentType?: string
}

type FetchMethod = (
  url: string,
  options?: FetchOptions,
  timeout?: number,
) => Promise<unknown>

export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function queryStringify(data: FetchData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

export class Api {
  get: FetchMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    )
  }

  post: FetchMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    )
  }

  put: FetchMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    )
  }

  delete: FetchMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    )
  }

  request: FetchMethod = (url, options = {}, timeout = 5000) => {
    const { method, data } = options
    const fetchUrl =
      method === METHODS.GET
        ? `${BASE_URL}${url}${queryStringify(data as FetchData)}`
        : `${BASE_URL}${url}`

    return fetch(fetchUrl, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      signal: AbortSignal.timeout(timeout),
    }).then(response => {
      const data = response.json()

      return response.status === 200
        ? data
        : data.then(err => {
            throw err
          })
    })
  }
}