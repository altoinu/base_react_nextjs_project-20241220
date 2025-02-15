export default class HTTPError extends Error {
  method;
  url;
  status;
  response;

  constructor(method, url, status, response) {
    super(`${method} ${url} (status: ${status})`);

    this.method = method;
    this.status = status;
    this.url = url;
    this.response = response;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
