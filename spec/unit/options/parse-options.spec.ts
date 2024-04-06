import { parseOptions } from "../../../src/options/parse-options";

describe(parseOptions, () => {
  describe("options is a number", () => {
    it("returns an object with batchSize equal to the number", () => {
      const rawOptions = 5;

      const options = parseOptions(rawOptions);

      expect(options).toEqual({ batchSize: 5 });
    });

    it("throws an error if batchSize is less than or equal to 0", () => {
      const rawOptions = 0;

      expect(() => parseOptions(rawOptions)).toThrow(
        "Batch size must be greater than 0",
      );
    });
  });

  describe("options is an object", () => {
    it("returns the object", () => {
      const rawOptions = { batchSize: 5 };

      const options = parseOptions(rawOptions);

      expect(options).toEqual({ batchSize: 5 });
    });

    it("throws an error if batchSize is less than or equal to 0", () => {
      const rawOptions = { batchSize: 0 };

      expect(() => parseOptions(rawOptions)).toThrow(
        "Batch size must be greater than 0",
      );
    });
  });
});
