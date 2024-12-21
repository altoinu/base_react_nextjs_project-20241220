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
        href={`${pathname}/hello`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        to [slug] page
      </Link>
      <br />
      <Link
        href={`${pathname}/..`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        return to one level above page
      </Link>
    </>
  );
};

export default BarPage;
