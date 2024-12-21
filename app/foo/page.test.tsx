import Page from "./page";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");

const mockUsePathname = usePathname as jest.Mock;

describe("foo page", () => {
  beforeAll(() => {
    mockUsePathname.mockReturnValue("mockURL");
  });

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
