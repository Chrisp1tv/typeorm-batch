import {
  getE2EDataSource,
  initDataSourceFromContainer,
} from "./e2e-data-source";
import { insertFixtures } from "./people.fixtures";
import {
  getPostgresContainer,
  setupPostgresContainer,
} from "./setup-environment";

beforeAll(async () => {
  await setupPostgresContainer();
  const dataSource = await initDataSourceFromContainer(getPostgresContainer());

  await insertFixtures(dataSource);
}, 30_000);

afterAll(async () => {
  await getE2EDataSource().destroy();
  await getPostgresContainer().stop();
});
