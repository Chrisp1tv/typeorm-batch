## TypeORM batch

This project provides a simple way to batch select data from any database supported by TypeORM.

## Installation

```bash
npm install typeorm-batch
```

## Usage

```typescript
import { batch } from "typeorm-batch/query-builder-batch";
import { Connection, createConnection } from "typeorm";
import { User } from "./User"; // Your entity

const queryBuilder = connection
  .getRepository(User)
  .createQueryBuilder("user")
  .select("user.id");

const usersBatches = batch(queryBuilder, 1_000);
for await (const usersBatch of usersBatches) {
  console.log(usersBatch);
}
```
