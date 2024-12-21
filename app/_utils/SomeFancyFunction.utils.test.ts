import { addNumbers, getNumberCloseToZero } from "./SomeFancyFunction.utils";

describe("SomeFancyFunction utils", () => {
  describe("addNumbers", () => {
    it("should return correct sum when two numbers provided", () => {
      expect(addNumbers(1, 1)).toEqual(2);
      expect(addNumbers(1, 2)).toEqual(3);
      expect(addNumbers(100, 200)).toEqual(300);
    });
  });
});

describe("Closest to zero", () => {
  describe("getNumberCloseToZero", () => {
    it("should return a number closest to zero when given two positive numbers", () => {
      expect(getNumberCloseToZero(1, 2)).toEqual(1);
    });

    it("should return a number closest to zero when given two negative numbers", () => {
      expect(getNumberCloseToZero(-1, -2)).toEqual(-1);
    });

    it("should return positive value if there is a tie (positive and negative)", () => {
      expect(getNumberCloseToZero(100, -100)).toEqual(100);
    });

    it("should return positive value if there is a tie (negative and positive)", () => {
      expect(getNumberCloseToZero(-100, 100)).toEqual(100);
    });
  });

  /*
  describe("from the list of numbers", () => {
    it("should return number provided when the list only contains one number", () => {
      expect(getNumberCloseToZeroFromTheList(3)).toEqual(3);
    });

    it.skip("should return a number closest to zero when given three positive numbers", () => {
      expect(getNumberCloseToZeroFromTheList(1, 2, 3)).toEqual(1);
    });

    it.skip("should return number closest zero when given a list of numbers", () => {});
  });
  */
});
