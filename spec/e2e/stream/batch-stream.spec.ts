import { getE2EDataSource } from "../support/e2e-data-source";
import { People } from "../support/people.entity";
import { BatchStream } from "../../../dist";

describe(BatchStream, () => {
  it("batches results of a query builder", async () => {
    const queryBuilder = getE2EDataSource()
      .getRepository(People)
      .createQueryBuilder()
      .select();

    const batches = new Array<People>();
    const stream = BatchStream(queryBuilder, 2);
    const streamEnd = new Promise((resolve) => stream.on("end", resolve));

    stream.on("data", (data) => batches.push(data));

    await streamEnd;

    expect(batches).toEqual([
      [
        { id: "d44cadc0-aba4-4db9-a8a5-2bcc5affcb2b", name: "Chris" },
        { id: "b3edae00-53e6-4a65-ad99-82c56392c855", name: "Mathieu" },
      ],
      [
        { id: "c4630a51-3a3b-46d5-8cf9-524ee8dbf34a", name: "Sam" },
        { id: "0af631f5-6f18-4e0f-8a93-90bb1bb7942e", name: "Jérémie" },
      ],
      [
        { id: "04d2b194-df28-4c95-972f-5c17fbff2892", name: "Aurélien" },
        { id: "72aa9dad-71fd-4370-bab8-db4a8716322e", name: "Octave" },
      ],
      [
        { id: "4c8c5649-b03a-4465-9a4b-ba96688ed29f", name: "Ludivine" },
        { id: "9bae8848-4129-4d30-967f-3c49bcdae2bc", name: "Cyrille" },
      ],
      [
        { id: "9b691af8-442c-40a8-94b4-61a6aff22433", name: "Adrien" },
        { id: "c448d91a-7a3e-4316-ba98-c80b2ea58577", name: "Emmanuel" },
      ],
    ]);
  });
});
