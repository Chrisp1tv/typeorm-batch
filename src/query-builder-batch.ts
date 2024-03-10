import { ObjectLiteral, SelectQueryBuilder } from "typeorm"

export function* batch<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  batchSize: number,
) {
  let offset = 0
  let results: T[]

  do {
    results = yield queryBuilder.take(offset).skip(batchSize).getMany()
    offset += batchSize
  } while (results.length === batchSize)
}
