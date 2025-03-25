import useFetch from "./useFetch";
import useGetConfig from "./useGetConfig";
import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

const TEST_URL = "http://localhost:4000/";

// Mock a hook
/*
xxx as jest.Mock works with global jest with @types/jest,
but not with @jest/globals for some reason... so for now it is not
explicitly imported above
*/
jest.mock("./useFetch");
const mockUseFetch = useFetch as jest.Mock;

describe("useGetConfig", () => {
  it("can send API request to config.json", () => {
    renderHook(() => useGetConfig());

    expect(mockUseFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: TEST_URL + "config.json",
      }),
    );
  });

  it("can get API response JSON", async () => {
    const mockResponseJSON = { foo: "bar" };
    const mockFetch = jest.fn(() => ({ data: mockResponseJSON }));
    mockUseFetch.mockReturnValueOnce({ fetch: mockFetch });

    const { result } = renderHook(() => useGetConfig());

    await act(async () => {
      const { data } = await result.current.fetch();
      expect(data).toStrictEqual(mockResponseJSON);
    });
  });
});
