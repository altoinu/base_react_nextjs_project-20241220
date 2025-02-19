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
 * @property {FetchResponseData} data The response body object.
 * @property {Response} response The HTTP Response object.
 */

/**
 * @typedef {Promise<FetchResponse>} FetchPromise
 * @memberof module:useFetch
 * @alias module:useFetch.FetchPromise
 */

/**
 * @typedef {function(FetchArgs):FetchPromise} FetchMethod
 * @memberof module:useFetch
 * @alias module:useFetch.FetchMethod
 * @async
 * @param {FetchArgs} options
 * @returns {FetchPromise}
 */

/**
 * @typedef {Object} UseFetchArgs
 * @memberof module:useFetch
 * @alias module:useFetch.UseFetchArgs
 */

/**
 * @typedef {Object} useFetchReturnObject
 * @memberof module:useFetch
 * @alias module:useFetch.useFetchReturnObject
 * @property {FetchMethod} fetch The method that will perform the request and
 * return a Promise.
 * @property {(FetchResponseData|null|undefined)} data The response body object
 * of the most recent request.
 * @property {(Error|unknown)} error Error object, if error had occurred.
 * @property {FetchStatus} fetchStatus Current FetchStatus.
 * @property {boolean} isFetching true when the network request is active.
 * @property {(Response|null)} response The HTTP Response object.
 */

/**
 * Custom hook that wraps `fetch` and handles all request & response handling.
 * @module useFetch
 * @version 1.0.0 2025/02/16
 * @param {UseFetchArgs} options Default request object data.
 * @param {Headers} [options.headers] HTTP request headers
 * @param {HTTPMethod} [options.method="GET"] HTTP method string
 * @param {string} options.url Request URL string
 * @returns {useFetchReturnObject} An object containing fetch method and
 * other fetch operation related data.
 * @example
 * const { fetch, data } = useFetch();
 *
 * // async await waty to fetch
 * async function doFetch() {
 *  try {
 *    const value = await fetch();
 *    console.log("fetch success!", value);
 *  } catch (error) {
 *    console.log("fetch error", error);
 *  }
 * }
 *
 * doFetch();
 *
 *
 *
 * // then catch way to fetch
 * fetch().then((value) => {
 *  console.log("fetch success!", value);
 * }).catch((error) => {
 *  console.log("fetch error", error);
 * });
 *
 *
 *
 * // Fetch via useEffect
 * useEffect(() => {
 *  if (fetch) {
 *    fetch();
 *  }
 * }, [fetch]);
 *
 * useEffect(() => {
 *  if (data) {
 *    console.log("data update:", data);
 *  }
 * }, [data]);
 */
function useFetch({ headers, method = "GET", url }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();

  /**
   * The method to perform the request & return a Promise.
   * @memberof module:useFetch
   * @alias module:useFetch.fetch
   * @async
   * @function fetch
   * @inner
   * @param {FetchArgs} options
   * @param {(string|ArrayBuffer|DataView|Blob|File|URLSearchParams|FormData|ReadableStream)} [options.body]
   * Request body data to be sent with this fetch operation
   * @param {Headers} [options.headers] HTTP request headers to be used, this time only
   * @param {(string|URLSearchParams|string[][]|Record<string, string>)} [options.query]
   * Query string params to append to the request URL
   * @param {string} [options.url] Request URL to be used, this time only
   * @returns {FetchPromise}
   */
  const executeFetch = useCallback(
    async ({
      body,
      headers: overrideHeaders,
      query,
      url: overrideUrl,
    } = {}) => {
      setData(undefined);
      setError(null);
      setFetchStatus(FetchStatus.Pending);
      setIsFetching(true);
      setResponse(null);

      const requestHeaders = overrideHeaders || headers;
      let requestUrl = overrideUrl || url;

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
