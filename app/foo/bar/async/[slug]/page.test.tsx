import Page, { generateMetadata } from "./page";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

// https://stackoverflow.com/questions/75729282/testing-an-async-server-component-with-jest-in-next-13/76253176#76253176
describe("slug page", () => {
  it("should provide correct title", async () => {
    const { title } = await generateMetadata({
      params: Promise.resolve({ slug: "hello!" }),
    });

    expect(title).toBe("Foo Bar page: hello!");
  });

  it("should render", async () => {
    const { container: pageContainer } = render(
      await Page({
        params: Promise.resolve({ slug: "hello!" }),
      }),
    );

    expect(pageContainer).toMatchSnapshot();
  });

  it("should render a heading", async () => {
    render(
      await Page({
        params: Promise.resolve({ slug: "hello!" }),
      }),
    );

    const heading = await screen.getByRole("heading");
    expect(heading).toHaveTextContent("Slug: hello!");
  });
});
