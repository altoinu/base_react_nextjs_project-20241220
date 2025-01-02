"use client";

import FetchDataComponent from "../_components/FetchDataComponent";
import { Stack } from "@mui/material";

export default function FooPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Stack direction="column">
      {children}
      <FetchDataComponent />
    </Stack>
  );
}
