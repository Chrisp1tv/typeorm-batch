import { DataSource } from "typeorm";
import { People } from "./people.entity";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

let E2EDataSource!: DataSource;

export async function initDataSourceFromContainer(
  container: StartedPostgreSqlContainer,
): Promise<DataSource> {
  E2EDataSource = new DataSource({
    type: "postgres",
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    schema: "public",
    synchronize: true,
    logging: true,
    entities: [People],
    subscribers: [],
    migrations: [],
  });

  await E2EDataSource.initialize();

  return E2EDataSource;
}

export function getE2EDataSource(): DataSource {
  return E2EDataSource;
}
