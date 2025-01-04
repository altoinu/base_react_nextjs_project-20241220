import useFetch from "./useFetch";
import useGetConfig from "./useGetConfig";
import { act, renderHook } from "@testing-library/react";

const TEST_URL = "http://localhost:4000/";

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
