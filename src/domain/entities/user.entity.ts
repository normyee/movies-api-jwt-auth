import { randomUUID } from 'crypto';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get email(): string {
    return this._email;
  }

  set email(newemail: string) {
    this._email = newemail;
  }

  get password(): string {
    return this._password;
  }

  set password(newpassword: string) {
    this._password = newpassword;
  }
}
