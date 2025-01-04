"use client";

import HTTPError from "../_types/HTTPError";
import { useCallback, useState } from "react";

/** Union type of supported HTTP method strings */
type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export enum FetchStatus {
  Idle,
  Pending,
  Succeeded,
  Failed,
}

type UseFetchArgs = {
  /** HTTP request headers */
  headers?: Headers;
  /** HTTP method string */
  method?: HTTPMethod;
  /** Request URL string */
  url: string;
};

type FetchArgs = {
  /** Request body data */
  body?:
    | string
    | ArrayBuffer
    | DataView
    | Blob
    | File
    | URLSearchParams
    | FormData
    | ReadableStream;
  /** HTTP request headers to be used only for this time */
  headers?: Headers;
  /** Query string params to append to the request URL */
  query?: string | URLSearchParams | string[][] | Record<string, string>;
  /**  Request URL string to be used only for this time */
  url?: string;
};

type FetchResponseData = JSON | string | Blob;
type FetchResponse = {
  data: FetchResponseData;
  response: Response;
};

/**
 * Custom hook that wraps `fetch` and handles all request & response handling.
 *
 * @param options Default request object data.
 * @returns An object containing:
 *   - `fetch`: The method that will perform the request & return a Promise.
 *   - `data`: The response body object of the most recent request.
 *   - `fetchStatus: Current FetchStatus
 *   - `isFetching`: Boolean; true when the network request is active.
 *   - `response`: The HTTP Response object.
 */
export default function useFetch({
  headers,
  method = "GET",
  url,
}: UseFetchArgs) {
  const [data, setData] = useState<FetchResponseData | null>();
  const [error, setError] = useState<Error | unknown | null>();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [response, setResponse] = useState<Response | null>();

  const executeFetch = useCallback(
    async ({
      body,
      headers: newHeaders,
      query,
      url: newUrl,
    }: FetchArgs = {}) => {
      setData(undefined);
      setError(null);
      setFetchStatus(FetchStatus.Pending);
      setIsFetching(true);
      setResponse(null);

      return new Promise<FetchResponse>(async (resolve, reject) => {
        // if newHeaders is specified, use that instead for this execute only
        const requestHeaders = newHeaders || headers;
        // if newUrl is specified, use that instead for this execute only
        let requestUrl = newUrl || url;
        // Append query string to request URL, if provided.
        if (query) {
          const queryParams = new URLSearchParams(query);
          requestUrl += `?${queryParams}`;
        }

        const request = new Request(requestUrl, {
          headers: requestHeaders,
          method,
          body,
        });

        try {
          const response = await fetch(request);

          if (!response.ok) {
            throw new HTTPError(method, requestUrl, response.status, response);
          }

          let responseData = null;

          try {
            const contentType = response.headers.get("Content-Type");

            if (contentType?.includes("application/json")) {
              responseData = await response.json();
            } else if (contentType?.includes("text/plain")) {
              responseData = await response.text();
            } else {
              responseData = await response.blob();
            }
          } catch (error) {
            // if content-length is non-empty, then something is wrong
            if (response.headers.get("Content-Length")) {
              throw error;
            }
          }

          setData(responseData);
          setError(null);
          setFetchStatus(FetchStatus.Succeeded);
          setIsFetching(false);
          setResponse(response);

          resolve({ data: responseData, response });
        } catch (error: unknown) {
          setData(null);
          setError(error);
          setFetchStatus(FetchStatus.Failed);
          setIsFetching(false);

          if (error instanceof Error) {
            if (error instanceof HTTPError) {
              console.error(error);
              setResponse(error.response);
            } else {
              console.error(`${method} ${requestUrl}: ${error.message}`);
              setResponse(null);
            }
            /*
            else {
              console.error(`${method} ${requestUrl}`, error);
            }
            */
          }

          reject(error);
        }
      });
    },
    [headers, method, url],
  );

  return {
    fetch: executeFetch,
    data,
    fetchStatus,
    isFetching,
    response,
    error,
  };
}
