"use client";

import { FetchStatus } from "../_hooks/useFetch";
import useGetConfig from "../_hooks/useGetConfig";
import { isConfigData } from "../_types/ConfigData";
import { useEffect } from "react";

export default function FetchDataComponent() {
  const { fetch, data, fetchStatus } = useGetConfig();

  useEffect(() => {
    if (fetch) {
      fetch();
    }
  }, [fetch]);

  useEffect(() => {
    if (data) {
      console.log("data update:", data);
    }
  }, [data]);

  return (
    <div className="flex flex-col">
      <hr />
      {fetchStatus == FetchStatus.Pending && <span>Loading config...</span>}
      {fetchStatus == FetchStatus.Failed && <span>Error config!!</span>}
      {fetchStatus == FetchStatus.Succeeded && data && isConfigData(data) && (
        <>
          <span>config.json response:</span>
          <pre>{JSON.stringify(data)}</pre>
        </>
      )}
    </div>
  );
}
