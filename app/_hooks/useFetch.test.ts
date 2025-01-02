import HTTPError from "../_types/HTTPError";
import useFetch from "./useFetch";
import { act, renderHook } from "@testing-library/react";

const TEST_URL = "https://www.example.com/test/";

// cache actual console.error
const cachedConsoleError = console.error;

// suppress console.error
function turnConsoleErrorsOff() {
  console.error = jest.fn();
}

// restore console.error from cached copy
function turnConsoleErrorsOn() {
  console.error = cachedConsoleError;
}

function mockNetwork(url: string, method: string) {
  return fetchMock.mockIf((req) => req.url === url && req.method === method);
}

describe("useFetch", () => {
  it("can perform DELETE requests", async () => {
    const mockFetch = mockNetwork(TEST_URL, "DELETE");

    const { result } = renderHook(() =>
      useFetch({
        method: "DELETE",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch();
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can perform GET requests", async () => {
    const mockFetch = mockNetwork(TEST_URL, "GET");

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch();
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can perform PATCH requests", async () => {
    const mockFetch = mockNetwork(TEST_URL, "PATCH");

    const { result } = renderHook(() =>
      useFetch({
        method: "PATCH",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch();
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can perform POST requests", async () => {
    const mockFetch = mockNetwork(TEST_URL, "POST");

    const { result } = renderHook(() =>
      useFetch({
        method: "POST",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch();
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can perform PUT requests", async () => {
    const mockFetch = mockNetwork(TEST_URL, "PUT");

    const { result } = renderHook(() =>
      useFetch({
        method: "PUT",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch();
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can send query params", async () => {
    const mockFetch = mockNetwork(TEST_URL + "?a=1&b=2", "GET");

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch({ query: "a=1&b=2" });
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("can send a JSON request body", async () => {
    mockNetwork(TEST_URL, "POST");
    let requestBody: JSON;
    fetchMock.mockResponseOnce(async (request: Request) => {
      requestBody = await request.json();
      return "";
    });

    const { result } = renderHook(() =>
      useFetch({
        method: "POST",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      await result.current.fetch({ body: JSON.stringify({ foo: "bar" }) });
      expect(requestBody).toStrictEqual({ foo: "bar" });
    });
  });

  it("can handle a JSON response body", async () => {
    mockNetwork(TEST_URL, "GET");
    const mockResponseJSON = { foo: "bar" };
    const mockResponseBody = JSON.stringify(mockResponseJSON);
    fetchMock.mockResponseOnce(mockResponseBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      const { data } = await result.current.fetch();
      expect(data).toStrictEqual(mockResponseJSON);
    });
  });

  it("can handle a text response body", async () => {
    mockNetwork(TEST_URL, "GET");
    const mockResponseBody = "HELLO WORLD";
    fetchMock.mockResponseOnce(mockResponseBody, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    await act(async () => {
      const { data } = await result.current.fetch();
      expect(data).toStrictEqual(mockResponseBody);
    });
  });

  // TODO: test blob (binary) response body
  xit("can handle a binary file response body", () => {});

  it("throws an HTTP error when a 4** response status is encountered", async () => {
    mockNetwork(TEST_URL, "GET");
    fetchMock.mockResponseOnce("", { status: 404 });

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    turnConsoleErrorsOff();

    try {
      await act(async () => {
        await result.current.fetch();
      });
    } catch (error) {
      expect(error instanceof HTTPError).toBe(true);

      if (error instanceof HTTPError) {
        expect(error.status).toBe(404);
      }
    }

    turnConsoleErrorsOn();
  });

  it("throws an HTTP error when a 5** response status is encountered", async () => {
    mockNetwork(TEST_URL, "GET");
    fetchMock.mockResponseOnce("", { status: 500 });

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    turnConsoleErrorsOff();

    try {
      await act(async () => {
        await result.current.fetch();
      });
    } catch (error) {
      expect(error instanceof HTTPError).toBe(true);

      if (error instanceof HTTPError) {
        expect(error.status).toBe(500);
      }
    }

    turnConsoleErrorsOn();
  });

  it("throws an error when bad data is returned (ex. bad JSON format)", async () => {
    mockNetwork(TEST_URL, "GET");
    const mockResponseBody = `{"foo": bar}`; // note: bar not in quotes
    fetchMock.mockResponseOnce(mockResponseBody, {
      headers: {
        "Content-Type": "application/json",
        //"Content-Type": "text/plain",
        "Content-Length": "12",
      },
    });

    const { result } = renderHook(() =>
      useFetch({
        method: "GET",
        url: TEST_URL,
      }),
    );

    turnConsoleErrorsOff();

    try {
      await act(async () => {
        await result.current.fetch();
      });
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }

    turnConsoleErrorsOn();
  });
});