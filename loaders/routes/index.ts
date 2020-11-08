import type { DataLoader } from '@remix-run/core';

class HTTPError extends Error {
  public response: Response;
  public status: number;

  public constructor(response: Response) {
    // Set the message to the status text, such as Unauthorized,
    // with some fallbacks. This message should never be undefined.
    super(
      response.statusText ||
        String(
          response.status === 0 || response.status
            ? response.status
            : 'Unknown response error'
        )
    );
    this.name = 'HTTPError';
    this.response = response;
    this.status = response.status;
  }
}

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response;
  }
  // convert non-2xx HTTP responses into errors:
  const error = new HTTPError(response);
  error.response = response;
  return Promise.reject(error);
};

const loader: DataLoader = async () => {
  try {
    const data = await fetch('https://formulae.brew.sh/api/cask.json')
      .then(checkResponse)
      .then(res => res.json());

    const body = JSON.stringify(data);

    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response(undefined, { status: 500 });
  }
};

export = loader;
