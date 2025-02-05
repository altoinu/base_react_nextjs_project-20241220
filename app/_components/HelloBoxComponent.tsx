"use client";

import styles from "./HelloBoxComponent.module.css";
import { useState } from "react";

export type HelloBoxProps = {
  personName: string;
  secondPersonName?: string;
  /**
   * Callback fired when the button is clicked.
   *
   * @param {Number} buttonNum Button number clicked.
   */
  onButtonClick?: (buttonNum: number) => void;
};

export default function HelloBoxComponent({
  personName,
  onButtonClick,
  ...props
}: HelloBoxProps) {
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
        <div className="flex flex-row">
          <button
            className={styles.button}
            onClick={() => handleButtonClick(1)}
          >
            Click Me!
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick(2)}
          >
            Click Me Too!
          </button>
        </div>
      )}
      {clickedButtonResponse && (
        <span>clicked button response: {clickedButtonResponse}</span>
      )}
    </>
  );
}
