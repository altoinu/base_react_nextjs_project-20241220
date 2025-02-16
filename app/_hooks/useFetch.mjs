import HTTPError from "../_types/HTTPError";
import { useCallback, useState } from "react";

/**
 * Fetch status.
 * @memberof module:useFetch
 * @alias module:useFetch.FetchStatus
 * @readonly
 * @enum
 * @property {string} Idle
 * @property {string} Pending
 * @property {string} Succeeded
 * @property {string} Failed
 */
export var FetchStatus;
(function (FetchStatus) {
  FetchStatus[(FetchStatus["Idle"] = 0)] = "Idle";
  FetchStatus[(FetchStatus["Pending"] = 1)] = "Pending";
  FetchStatus[(FetchStatus["Succeeded"] = 2)] = "Succeeded";
  FetchStatus[(FetchStatus["Failed"] = 3)] = "Failed";
})(FetchStatus || (FetchStatus = {}));

/**
 * Union type of supported HTTP method strings
 * @typedef {("DELETE"|"GET"|"PATCH"|"POST"|"PUT")} HTTPMethod
 * @memberof module:useFetch
 * @alias module:useFetch.HTTPMethod
 */

/**
 * @typedef {Object} FetchArgs
 * @memberof module:useFetch
 * @alias module:useFetch.FetchArgs
 * @property {(string|ArrayBuffer|DataView|Blob|File|URLSearchParams|FormData|ReadableStream)} [body] Request body data
 * @property {Headers} [headers] HTTP request headers to be used only for this time
 * @property {(string|URLSearchParams|string[][]|Record<string, string>)} [query] Query string params to append to the request URL
 * @property {string} [url] Request URL string to be used only for this time
 */

/**
 * @typedef {(JSON|string|Blob)} FetchResponseData
 * @memberof module:useFetch
 * @alias module:useFetch.FetchResponseData
 */

/**
 * @typedef {Object} FetchResponse
 * @memberof module:useFetch
 * @alias module:useFetch.FetchResponse
 * @property {FetchResponseData} data
 * @property {Response} response
 */

/**
 * @typedef {Object} UseFetchArgs
 * @memberof module:useFetch
 * @alias module:useFetch.UseFetchArgs
 * @property {Headers} [headers] HTTP request headers
 * @property {HTTPMethod} [method="GET"] HTTP method string
 * @property {string} url Request URL string
 */

/**
 * @typedef {Object} useFetchReturnObject
 * @memberof module:useFetch
 * @alias module:useFetch.useFetchReturnObject
 * @property {function(FetchArgs):Promise<FetchResponse>} fetch
 * @property {(FetchResponseData|null|undefined)} data
 * @property {(Error|unknown)} error
 * @property {FetchStatus} fetchStatus
 * @property {boolean} isFetching
 * @property {(Response|null)} response
 */

/**
 * Custom hook that wraps `fetch` and handles all request & response handling.
 * @module useFetch
 * @version 1.0.0 2025/02/16
 * @param {UseFetchArgs} options Default request object data.
 * @returns {useFetchReturnObject} An object containing:
 * - fetch: The method that will perform the request & return a Promise.
 * - data: The response body object of the most recent request.
 * - error: Error object, if error had occurred.
 * - fetchStatus: Current FetchStatus.
 * - isFetching: Boolean; true when the network request is active.
 * - response: The HTTP Response object.
 */
function useFetch({ headers, method = "GET", url }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();

  const executeFetch = useCallback(
    async ({ body, headers: newHeaders, query, url: newUrl } = {}) => {
      setData(undefined);
      setError(null);
      setFetchStatus(FetchStatus.Pending);
      setIsFetching(true);
      setResponse(null);

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

        const contentType = response.headers.get("Content-Type");
        let responseData = null;
        try {
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

        return Promise.resolve({ data: responseData, response });
      } catch (error) {
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

        return Promise.reject(error);
      }
    },
    [headers, method, url],
  );

  return {
    fetch: executeFetch,
    data,
    error,
    fetchStatus,
    isFetching,
    response,
  };
}

export default useFetch;
