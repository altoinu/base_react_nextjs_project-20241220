"use client";

import HelloBoxComponent from "../_components/HelloBoxComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooPage() {
  const pathname = usePathname();

  function handleButtonClick(buttonNum: number) {
    alert("button number clicked:" + buttonNum);
  }

  return (
    <>
      <h2>This is Foo page.</h2>
      <p>Pathname: {pathname}</p>
      <br />
      <HelloBoxComponent personName="Kaoru" />
      <br />
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={handleButtonClick}
      />
      <br />
      <Link
        href={`${pathname}/bar`}
        style={{ color: "red", textDecoration: "underline" }}
      >
        to Bar page
      </Link>
    </>
  );
}
