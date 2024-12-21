import Page from "./page";
import { render, screen } from "@testing-library/react";

describe("foo page", () => {
  it("should render", () => {
    const { container: PageContainer } = render(<Page />);

    expect(PageContainer).toMatchSnapshot();
  });

  it("should render a heading", () => {
    render(<Page />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("This is Foo page.");
  });
});
