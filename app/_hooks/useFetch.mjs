"use client";

import HTTPError from "../_types/HTTPError";
import { useCallback, useState } from "react";

export var FetchStatus;
(function (FetchStatus) {
  FetchStatus[(FetchStatus["Idle"] = 0)] = "Idle";
  FetchStatus[(FetchStatus["Pending"] = 1)] = "Pending";
  FetchStatus[(FetchStatus["Succeeded"] = 2)] = "Succeeded";
  FetchStatus[(FetchStatus["Failed"] = 3)] = "Failed";
})(FetchStatus || (FetchStatus = {}));

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
export default function useFetch({ headers, method = "GET", url }) {
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

      return new Promise(async (resolve, reject) => {
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
