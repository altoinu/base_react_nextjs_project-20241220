"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BarPage = () => {
  const pathname = usePathname();

  return (
    <>
      <h2>This is Bar page.</h2>
      <p>Pathname: {pathname}</p>
      <Link
        href={`${pathname}/..`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        return to one level above page
      </Link>
      <br />
      <Link
        href={`${pathname}/async/hello`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        to asynchronous [slug] page
      </Link>
      <br />
      <br />
      <Link
        href={`${pathname}/sync/hello`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        to synchronous [slug] page
      </Link>
      <br />
    </>
  );
};

export default BarPage;
