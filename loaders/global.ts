import type { DataLoader } from '@remix-run/core';

const loader: DataLoader = () => new Response(undefined, { status: 200 });

export = loader;
