import type { DataLoader } from "@remix-run/core";
import { json } from "@remix-run/loader";

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
            : "Unknown response error"
        )
    );
    this.name = "HTTPError";
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

let loader: DataLoader = async () => {
  try {
    const promise = await fetch("https://formulae.brew.sh/api/cask.json");

    await checkResponse(promise);

    const data = await promise.json();

    return json(data, {
      status: 200,
      headers: promise.headers,
    });
  } catch (error) {
    const body = { message: "error getting data from github" };
    return json(body, { status: 500 });
  }
};

export = loader;
