import useFetch from "./useFetch";

export default function useGetConfig() {
  return useFetch({
    method: "GET",
    url: "http://localhost:4000/config.json",
  });
}
