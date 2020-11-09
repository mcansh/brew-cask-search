import React from 'react';
import ReactDOM from 'react-dom';
import Remix from '@remix-run/react/browser';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { App } from './app';

Sentry.init({
  dsn: `https://7d9da9ccdcc34dc29d33a54da6d28e2a@o74198.ingest.sentry.io/5509044`,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
});

ReactDOM.hydrate(
  // @ts-expect-error @types/react-dom says the 2nd argument to ReactDOM.hydrate() must be a
  // `Element | DocumentFragment | null` but React 16 allows you to pass the
  // `document` object as well. This is a bug in @types/react-dom that we can
  // safely ignore for now.
  <Remix>
    <App />
  </Remix>,
  document
);
