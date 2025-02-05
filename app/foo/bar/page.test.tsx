import Page from "./page";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

// mock a hook
jest.mock("next/navigation");
const mockUsePathname = usePathname as jest.Mock;
mockUsePathname.mockReturnValue("/mockURL");

describe("bar page", () => {
  it("should render", () => {
    const { container: pageContainer } = render(<Page />);

    expect(pageContainer).toMatchSnapshot();
  });

  it("should render a heading", () => {
    render(<Page />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("This is Bar page.");
  });
});
