import HelloBoxComponent from "./HelloBoxComponent";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<HelloBoxComponent>", () => {
  it("should render", () => {
    const { container: HomePageContainer } = render(
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={jest.fn()}
      />,
    );

    expect(HomePageContainer).toMatchSnapshot();
  });

  it("should have person's name", () => {
    render(<HelloBoxComponent personName="Kaoru" />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("Hello Kaoru!");
  });

  it("should have person and second person's names", () => {
    render(<HelloBoxComponent personName="John" secondPersonName="Doe" />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("Hello John and Doe!");
  });

  it("should have two buttons when onButtonClick is set", () => {
    render(
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={jest.fn()}
      />,
    );

    const button1 = screen.getByRole("button", { name: "Click Me!" });
    expect(button1).toBeInTheDocument();
    const button2 = screen.getByRole("button", { name: "Click Me Too!" });
    expect(button2).toBeInTheDocument();
  });

  it("should contain corresponding clicked button response in body when either button is clicked", async () => {
    const user = userEvent.setup();

    const handleButtonClick = jest.fn();
    render(
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={handleButtonClick}
      />,
    );
    const button1 = screen.getByRole("button", { name: "Click Me!" });
    const button2 = screen.getByRole("button", { name: "Click Me Too!" });

    await user.click(button1);

    expect(
      screen.getByText("clicked button response: First button clicked"),
    ).toBeInTheDocument();

    await user.click(button2);

    expect(
      screen.getByText("clicked button response: Second button clicked"),
    ).toBeInTheDocument();
  });

  it("should call onButtonClick with 'First button clicked' when first button is clicked", async () => {
    const user = userEvent.setup();

    const handleButtonClick = jest.fn();
    render(
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={handleButtonClick}
      />,
    );
    const button1 = screen.getByRole("button", { name: "Click Me!" });

    await user.click(button1);

    expect(handleButtonClick).toHaveBeenCalledWith(1);
  });

  it("should call onButtonClick with 'Second button clicked' when first button is clicked", async () => {
    const user = userEvent.setup();

    const handleButtonClick = jest.fn();
    render(
      <HelloBoxComponent
        personName="John"
        secondPersonName="Doe"
        onButtonClick={handleButtonClick}
      />,
    );
    const button2 = screen.getByRole("button", { name: "Click Me Too!" });

    await user.click(button2);

    expect(handleButtonClick).toHaveBeenCalledWith(2);
  });
});
