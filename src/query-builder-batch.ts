import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { parseOptions } from "./options/parse-options";
import { Options } from "./options/options";

async function* batchGenerator<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  { batchSize }: Options,
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
  rawOptions: Options | number,
) {
  if (!queryBuilder) {
    throw new Error("Query builder is required");
  }

  const options = parseOptions(rawOptions);

  return batchGenerator(queryBuilder, options);
}
