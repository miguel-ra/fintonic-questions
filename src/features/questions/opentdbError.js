const STATUS_RESULTS_FETCHED = 0;
const STATUS_EMPTY_RESULTS = 1;
const STATUS_INVALID_PARAMETER = 2;
const STATUS_TOKEN_NOT_FOUND = 3;
const STATUS_TOKEN_EMPTY = 4;

class InvalidParameterError extends Error {
  constructor() {
    super();
    this.name = "InvalidParameterError";
    this.message = "[opentdb] Invalid parameter";
  }
}
class TokenNotFoundError extends Error {
  constructor() {
    super();
    this.name = "TokenNotFoundError";
    this.message = "[opentdb] Token not found";
  }
}
class TokenEmptyError extends Error {
  constructor() {
    super();
    this.name = "TokenEmptyError";
    this.message = "[opentdb] Token empty";
  }
}
class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplementedError";
    this.message = "[opentdb] Unknown error code";
  }
}

/**
 * There are 2 solutions to manage this busines error for this task:
 * 1. Have a common Business Error to unify the errors (the simple one because this is not a real project)
 * 2. Have separate business errors (we will go for this solution)
 */
function opentdbError2BusinessError(responseCode) {
  const errorCodes2Error = {
    [STATUS_INVALID_PARAMETER]: new InvalidParameterError(),
    [STATUS_TOKEN_NOT_FOUND]: new TokenNotFoundError(),
    [STATUS_TOKEN_EMPTY]: new TokenEmptyError(),
  };
  return errorCodes2Error[responseCode] ?? new NotImplementedError();
  /**
   * TODO: If error.name is TokenNotFoundError then it's necessary put an interceptor
   * and refresh the token
   */
}

export {
  STATUS_RESULTS_FETCHED,
  STATUS_EMPTY_RESULTS,
  STATUS_INVALID_PARAMETER,
  STATUS_TOKEN_NOT_FOUND,
  STATUS_TOKEN_EMPTY,
  opentdbError2BusinessError,
};
