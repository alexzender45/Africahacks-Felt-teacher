export class GenericResponseError extends Error {
  constructor(code, message) {
    super(message);
  }
}

export function throwError(code, message) {
  throw new GenericResponseError(code, message);
}
