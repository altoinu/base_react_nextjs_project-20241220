export default class HTTPError extends Error {
  method: string;
  url: string;
  status: number;
  response: Response;

  constructor(method: string, url: string, status: number, response: Response);
}
