import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { EntryContext } from '@remix-run/core';
import Remix from '@remix-run/react/server';
import * as Sentry from '@sentry/node';

import { App } from './app';

Sentry.init({
  dsn: `https://7d9da9ccdcc34dc29d33a54da6d28e2a@o74198.ingest.sentry.io/5509044`,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = ReactDOMServer.renderToString(
    <Remix context={remixContext} url={request.url}>
      <App />
    </Remix>
  );

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      'Content-Type': 'text/html',
    },
  });
}
