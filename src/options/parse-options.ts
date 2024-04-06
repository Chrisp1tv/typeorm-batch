import { Options } from "./options";

export function parseOptions(rawOptions: number | Options): Options {
  let options: Options;
  if (typeof rawOptions === "number") {
    options = { batchSize: rawOptions };
  } else {
    options = rawOptions;
  }

  if (options.batchSize <= 0) {
    throw new Error("Batch size must be greater than 0");
  }

  return options;
}
