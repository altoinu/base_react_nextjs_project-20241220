"use client";

import { FetchStatus } from "../_hooks/useFetch";
import useGetConfig from "../_hooks/useGetConfig";
import { isConfigData } from "../_types/ConfigData";
import { Divider, Stack, Typography } from "@mui/material";
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
      console.log(data);
    }
  }, [data]);

  return (
    <Stack direction="column" sx={{ mt: 4 }}>
      <Divider />
      {fetchStatus == FetchStatus.Pending && (
        <Typography variant="body1">Loading config...</Typography>
      )}
      {fetchStatus == FetchStatus.Succeeded && data && isConfigData(data) && (
        <>
          <Typography variant="body1">config.json response:</Typography>
          <pre>{JSON.stringify(data)}</pre>
        </>
      )}
    </Stack>
  );
}
