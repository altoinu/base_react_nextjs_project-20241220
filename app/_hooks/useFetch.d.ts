import { type Response } from "react";

export declare enum FetchStatus {
  Idle = 0,
  Pending = 1,
  Succeeded = 2,
  Failed = 3,
}

export type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export type FetchArgs = {
  body?:
    | string
    | ArrayBuffer
    | DataView
    | Blob
    | File
    | URLSearchParams
    | FormData
    | ReadableStream;
  headers?: Headers;
  query?: string | URLSearchParams | string[][] | Record<string, string>;
  url?: string;
};

export type FetchResponseData = JSON | string | Blob;

export type FetchResponse = {
  data: FetchResponseData;
  response: Response;
};

export type UseFetchArgs = {
  headers?: Headers;
  method?: HTTPMethod;
  url: string;
};

export default function useFetch({ headers, method, url }: UseFetchArgs): {
  fetch: ({ body, headers, query, url }?: FetchArgs) => Promise<FetchResponse>;
  data: FetchResponseData | null | undefined;
  error: Error | unknown;
  fetchStatus: FetchStatus;
  isFetching: boolean;
  response: Response | null;
};

export {};
