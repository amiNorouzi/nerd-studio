import { Method } from "axios";

//fetcher for server components

/**
 * `baseUrl` is a constant that holds the base URL for the API.
 * It is taken from the environment variable `NEXT_PUBLIC_API_URL`.
 */
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * `commonHeaders` is a constant that holds the common headers for the requests.
 * It includes the `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Content-Type` headers.
 */
const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  "Content-Type": "application/json;charset=utf-8",
};

/**
 * `FetcherInput` is an interface that defines the input for the `fetcher` function.
 * It has the following optional properties:
 * - `method`: The HTTP method for the request.
 * - `headers`: The headers for the request.
 * - `cache`: The cache mode for the request.
 * - `revalidate`: The revalidation time for the request.
 * - `tags`: The tags for the request.
 */
interface FetcherInput {
  method?: Method;
  headers?: { [index: string]: string };
  cache?: "force-cache" | "no-store";
  revalidate?: number;
  tags?: string[];
}

/**
 * `fetcher` is an asynchronous function that makes a fetch request with the provided URL and input.
 * It uses the `fetch` function to make the request.
 *
 * The function first constructs the full URL by concatenating the `baseUrl` and the provided `url`.
 * Then, it makes the fetch request with the full URL and the provided input.
 * If the request is successful, it returns the data from the response as a promise.
 * If the request fails, it throws the error.
 *
 * @param {string} url - The URL for the request.
 * @param {FetcherInput} input - The input for the request.
 *
 * @returns {Promise<T>} A promise that resolves to the data from the response.
 */
export default async function fetcher<T>(
  url: string,
  { method = "GET", headers = {}, cache, revalidate, tags }: FetcherInput,
): Promise<T> {
  try {
    const res = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        ...commonHeaders,
        ...headers,
      },
      cache,
      next: {
        revalidate, //revalidate time in second - it could not be used when cash set to force-cash
        tags, //for unstable revalidate cash
      },
    });
    // return the data from the response as given generic type
    return (await res.json()) as Promise<T>;
  } catch (e) {
    throw e;
  }
}
