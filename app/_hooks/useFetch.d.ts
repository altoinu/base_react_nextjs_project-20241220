import { type Response } from "react";

/** Union type of supported HTTP method strings */
type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export declare enum FetchStatus {
  Idle = 0,
  Pending = 1,
  Succeeded = 2,
  Failed = 3,
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

export type FetchResponseData = JSON | string | Blob;

type FetchResponse = {
  data: FetchResponseData;
  response: Response;
};

export default function useFetch({ headers, method, url }: UseFetchArgs): {
  fetch: ({
    body,
    headers: newHeaders,
    query,
    url: newUrl,
  }?: FetchArgs) => Promise<FetchResponse>;
  data: FetchResponseData | null | undefined;
  error: Error | unknown;
  fetchStatus: FetchStatus;
  isFetching: boolean;
  response: Response | null;
};

export {};
