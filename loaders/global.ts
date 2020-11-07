import type { DataLoader } from "@remix-run/core";

let loader: DataLoader = async () => {
  return new Response(undefined, { status: 200 });
};

export = loader;
