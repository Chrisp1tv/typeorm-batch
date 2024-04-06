import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import Mock = jest.Mock;
import { batch } from "../../src";
import * as parseOptions from "../../src/options/parse-options";

describe(batch, () => {
  it("uses parse-options to parse and validate options", () => {
    const queryBuilder = {} as SelectQueryBuilder<ObjectLiteral>;
    const batchSize = 1;
    const parseOptionsSpy = jest.spyOn(parseOptions, "parseOptions");

    batch(queryBuilder, batchSize);

    expect(parseOptionsSpy).toHaveBeenCalledWith(batchSize);
  });

  describe("validations", () => {
    it("throws an error if queryBuilder is not provided", () => {
      const queryBuilder =
        undefined as unknown as SelectQueryBuilder<ObjectLiteral>;
      const batchSize = 1;

      expect(() => batch(queryBuilder, batchSize).next()).toThrow(
        "Query builder is required",
      );
    });
  });

  describe("with mocked query builder", () => {
    const results = [{}, {}];

    let queryBuilderMock: SelectQueryBuilder<ObjectLiteral>;

    beforeEach(() => {
      queryBuilderMock = {
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      } as unknown as SelectQueryBuilder<ObjectLiteral>;
    });

    it("returns a generator that yields batches of results", async () => {
      (queryBuilderMock.getMany as Mock)
        .mockResolvedValueOnce(results)
        .mockResolvedValueOnce([]);

      const generator = batch(queryBuilderMock, 3);
      const next = await generator.next();
      const firstBatch = next.value;

      expect(next.done).toBe(false);
      expect(firstBatch).toBe(results);

      const nextBatch = await generator.next();

      expect(nextBatch.value).toEqual(undefined);
      expect(nextBatch.done).toBe(true);
    });

    it("does not send an empty batch if the last batch was full", async () => {
      (queryBuilderMock.getMany as Mock)
        .mockResolvedValueOnce(results)
        .mockResolvedValueOnce([]);

      const generator = batch(queryBuilderMock, 2);
      const firstBatch = (await generator.next()).value;
      const secondBatch = (await generator.next()).value;

      expect(firstBatch).toBe(results);
      expect(secondBatch).toEqual(undefined);
    });
  });
});
