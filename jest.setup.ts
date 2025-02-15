// https://github.com/testing-library/jest-dom
// https://github.com/testing-library/jest-dom?tab=readme-ov-file#usage
import "@testing-library/jest-dom";
// https://github.com/testing-library/jest-dom?tab=readme-ov-file#with-jestglobals
import "@testing-library/jest-dom/jest-globals";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
