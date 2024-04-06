import { Readable } from "stream";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { batch } from "../query-builder-batch";
import { Options } from "../options/options";

export function BatchStream<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: Options | number,
) {
  return Readable.from(batch(queryBuilder, options));
}
