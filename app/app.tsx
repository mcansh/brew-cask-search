import React from 'react';
import { Meta, Scripts, Styles, Routes } from '@remix-run/react';

const App: React.VFC = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, viewport-fit=cover"
      />
      <Meta />
      <Styles />
    </head>
    <body>
      <Routes />
      <Scripts />
    </body>
  </html>
);

export { App };
