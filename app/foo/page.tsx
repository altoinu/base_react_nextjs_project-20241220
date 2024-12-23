"use client";

import HelloBoxComponent from "../_components/HelloBoxComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooPage = () => {
  const pathname = usePathname();

  const handleButtonClick = (buttonNum: number) =>
    alert("button number clicked:" + buttonNum);

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
};

export default FooPage;
