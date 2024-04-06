import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import * as batch from "../../../src/query-builder-batch";
import { BatchStream } from "../../../src";
import { Readable } from "stream";

describe(BatchStream, () => {
  it("uses batch method to create a Readable stream", async () => {
    const queryBuilder = {} as SelectQueryBuilder<ObjectLiteral>;
    const batchSize = 1;
    const batchSpy = jest.spyOn(batch, "batch");

    BatchStream(queryBuilder, batchSize);

    expect(batchSpy).toHaveBeenCalledWith(queryBuilder, batchSize);
  });

  it("returns a Readable stream", () => {
    const queryBuilder = {} as SelectQueryBuilder<ObjectLiteral>;
    const batchSize = 1;

    const stream = BatchStream(queryBuilder, batchSize);

    expect(stream).toBeInstanceOf(Readable);
  });
});
