"use client";

import { Button, Stack } from "@mui/material";
import { useState } from "react";

type HomePageProps = {
  personName: string;
  secondPersonName?: string;
  /**
   * Callback fired when the button is clicked.
   *
   * @param {Number} buttonNum Button number clicked.
   */
  onButtonClick?: (buttonNum: number) => void;
};

const HelloBoxComponent = ({
  personName,
  onButtonClick,
  ...props
}: HomePageProps) => {
  const [clickedButtonResponse, setClickedButtonResponse] = useState<string>();

  const handleButtonClick = (buttonNum: number) => {
    const response =
      buttonNum === 1
        ? "First button clicked"
        : buttonNum === 2
          ? "Second button clicked"
          : "something else clicked";

    setClickedButtonResponse(response);

    onButtonClick?.(buttonNum);
  };

  return (
    <>
      <h1>
        Hello {personName}
        {props.secondPersonName ? ` and ${props.secondPersonName}` : ""}!
      </h1>
      {onButtonClick && (
        <Stack direction="row" gap={1}>
          <Button variant="contained" onClick={() => handleButtonClick(1)}>
            Click Me!
          </Button>
          <Button variant="contained" onClick={() => handleButtonClick(2)}>
            Click Me Too!
          </Button>
        </Stack>
      )}
      {clickedButtonResponse && (
        <p>clicked button response: {clickedButtonResponse}</p>
      )}
    </>
  );
};

export default HelloBoxComponent;
