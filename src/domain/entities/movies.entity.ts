import { randomUUID } from 'crypto';

export class Movies {
  private _id: string;
  private _title: string;
  private _description: string;
  private _year: string;

  constructor(id: string, title: string, description: string, year: string) {
    this._id = id ?? randomUUID();
    this._title = title;
    this._description = description;
    this._year = year;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get description(): string {
    return this._description;
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }

  get year(): string {
    return this._year;
  }

  set year(newYear: string) {
    this._year = newYear;
  }
}
