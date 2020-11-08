import React from 'react';
import { Meta, Scripts, Styles, Routes } from '@remix-run/react';

const App: React.VFC = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
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
