import type { DataLoader } from "@remix-run/core";

let loader: DataLoader = async () => {
  return undefined;
};

export = loader;
