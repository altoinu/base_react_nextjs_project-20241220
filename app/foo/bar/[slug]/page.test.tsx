import Page from "./page";
import { render, screen } from "@testing-library/react";

describe("bar page", () => {
  it("should render", () => {
    const { container: PageContainer } = render(
      <Page params={{ slug: "hello!" }} />,
    );

    expect(PageContainer).toMatchSnapshot();
  });

  it("should render a heading", () => {
    render(<Page params={{ slug: "hello!" }} />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("Slug: hello!");
  });
});
