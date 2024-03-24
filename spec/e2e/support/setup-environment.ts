import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { Wait } from "testcontainers";

let postgresContainer: StartedPostgreSqlContainer;

export async function setupPostgresContainer() {
  postgresContainer = await new PostgreSqlContainer()
    .withUsername("test")
    .withPassword("test")
    .withDatabase("test")
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

  return postgresContainer;
}

export function getPostgresContainer() {
  return postgresContainer;
}
