# TypeORM batch

This project provides a simple way to batch select data from any database supported by TypeORM, in two flavors:

- async generator
- readable stream

See below for how to use each of them.

## Installation

```bash
npm install typeorm-batch
```

## Usage

### Async generator

```typescript
import { batch } from "typeorm-batch";
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

### Readable stream

```typescript
import { BatchStream } from "typeorm-batch";
import { Connection, createConnection } from "typeorm";
import { User } from "./User"; // Your entity

const queryBuilder = connection
  .getRepository(User)
  .createQueryBuilder("user")
  .select("user.id");

const usersStream = BatchStream(queryBuilder, 1_000); // usersStream is a Readable stream

usersStream.on("data", (usersBatch) => {
  console.log(usersBatch);
});
```
