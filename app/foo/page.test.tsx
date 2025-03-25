import HelloBoxComponent from "../_components/HelloBoxComponent";
import Page from "./page";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

// Mock a hook
/*
xxx as jest.Mock works with global jest with @types/jest,
but not with @jest/globals for some reason... so for now it is not
explicitly imported above
*/
jest.mock("next/navigation");
const mockUsePathname = usePathname as jest.Mock;
mockUsePathname.mockReturnValue("/mockURL");

// Several different ways to mock child component
/*
jest.mock("../_components/HelloBoxComponent");
*/
jest.mock("../_components/HelloBoxComponent", () =>
  jest.fn(() => <div>Mock HelloBoxComponent</div>),
);
/*
jest.mock("../_components/HelloBoxComponent", () =>
  jest.fn(({ personName }: HelloBoxProps) => (
    <div>Mock HelloBoxComponent {personName}</div>
  )),
);
*/
/*
jest.mock("../_components/HelloBoxComponent", () => ({
  __esModule: true,
  default: ({ personName, secondPersonName }: HelloBoxProps) => (
    <div role="mock-hellobox">
      <span>Mock HelloBoxComponent</span>
      <span data-testid="personName">{personName}</span>
      {secondPersonName && (
        <span data-testid="secondPersonName">{secondPersonName}</span>
      )}
    </div>
  ),
}));
*/

describe("foo page", () => {
  it("should render", () => {
    const { container: pageContainer } = render(<Page />);

    expect(pageContainer).toMatchSnapshot();
  });

  it("should render a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("This is Foo page.");

    const heading2 = screen.getByText("This is Foo page.");
    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveRole("heading");
  });

  it("should render HelloBoxComponents", () => {
    render(<Page />);

    // Tests to see if passed props were received correctly
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

    /*
    // Other ways to test props, by checking actual elements in mocked component
    const helloBox = screen.getAllByRole("mock-hellobox");
    expect(helloBox).toHaveLength(2);

    expect(helloBox[0]).toBeInTheDocument();
    expect(within(helloBox[0]).queryByTestId("personName")).toHaveTextContent(
      "Kaoru",
    );
    expect(
      within(helloBox[0]).queryByTestId("secondPersonName"),
    ).not.toBeInTheDocument();

    expect(helloBox[1]).toBeInTheDocument();
    expect(within(helloBox[1]).queryByTestId("personName")).toHaveTextContent(
      "John",
    );
    expect(
      within(helloBox[1]).queryByTestId("secondPersonName"),
    ).toHaveTextContent("Doe");
    */
  });
});
