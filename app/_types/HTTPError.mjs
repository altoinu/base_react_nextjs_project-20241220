/**
 * Class representing error that may occur from fetch operation.
 * @version 1.0.0 2025/02/16
 */
class HTTPError extends Error {
  /**
   * URL method.
   * @public
   * @type {string}
   */
  method;

  /**
   * URL.
   * @public
   * @type {string}
   */
  url;

  /**
   * Response status code.
   * @public
   * @type {number}
   */
  status;

  /**
   * URL response object.
   * @public
   * @type {Response}
   */
  response;

  /**
   * Constructor.
   * @param {string} method
   * @param {string} url
   * @param {number} status
   * @param {Response} response
   */
  constructor(method, url, status, response) {
    super(`${method} ${url} (status: ${status})`);

    this.method = method;
    this.status = status;
    this.url = url;
    this.response = response;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export default HTTPError;
