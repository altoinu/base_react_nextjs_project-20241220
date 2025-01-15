"use client";

import FetchDataComponent from "../_components/FetchDataComponent";

export default function FooPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col">
      {children}
      <FetchDataComponent />
    </div>
  );
}
