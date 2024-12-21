"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FooPage = () => {
  const pathname = usePathname();

  return (
    <>
      <h2>This is Foo page.</h2>
      <Link
        href={`${pathname}bar`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        to Bar page
      </Link>
    </>
  );
};

export default FooPage;
