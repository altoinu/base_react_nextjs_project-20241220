"use client";

export default function BarPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>This is Bar page layout.</header>
      <section>{children}</section>
    </>
  );
}
