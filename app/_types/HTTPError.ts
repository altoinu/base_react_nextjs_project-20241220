export default class HTTPError extends Error {
  method: string;
  url: string;
  status: number;
  response: Response;

  constructor(method: string, url: string, status: number, response: Response) {
    super(`${method} ${url} (status: ${status})`);

    this.method = method;
    this.status = status;
    this.url = url;
    this.response = response;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
