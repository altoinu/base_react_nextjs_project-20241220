import HelloBoxComponent from "../_components/HelloBoxComponent";
import Page from "./page";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");
const mockUsePathname = usePathname as jest.Mock;

//<h2>This is mocked HelloBoxComponent.</h2>
jest.mock("../_components/HelloBoxComponent");

describe("foo page", () => {
  beforeAll(() => {
    mockUsePathname.mockReturnValue("/mockURL");
  });

  it("should render", () => {
    const { container: pageContainer } = render(<Page />);

    expect(pageContainer).toMatchSnapshot();
  });

  it("should render a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("This is Foo page.");
  });

  it("should render HelloBoxComponents", () => {
    render(<Page />);

    expect(HelloBoxComponent).toHaveBeenCalledTimes(2);
    expect(HelloBoxComponent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ personName: "Kaoru" }),
      undefined,
    );
    expect(HelloBoxComponent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ personName: "John", secondPersonName: "Doe" }),
      undefined,
    );
  });
});
