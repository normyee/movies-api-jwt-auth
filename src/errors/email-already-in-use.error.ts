// when email is already in error

export class EmailAlreadyInUseException extends Error {
  private _message: string;
  private _statusCode: number;

  constructor(message: string, statusCode = 409) {
    super(message);
    this._message = message;
    this._statusCode = statusCode;
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._statusCode;
  }
}
