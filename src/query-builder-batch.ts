import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

async function* batchGenerator<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  batchSize: number,
) {
  let offset = 0;
  let resultsLength: number;

  queryBuilder.take(batchSize);

  do {
    const results = await queryBuilder.skip(offset).getMany();
    resultsLength = results.length;

    if (resultsLength === 0) {
      break;
    }

    yield results;

    offset += batchSize;
  } while (resultsLength === batchSize);
}

export function batch<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  batchSize: number,
) {
  if (!queryBuilder) {
    throw new Error("Query builder is required");
  }

  if (batchSize <= 0) {
    throw new Error("Batch size must be greater than 0");
  }

  return batchGenerator(queryBuilder, batchSize);
}
