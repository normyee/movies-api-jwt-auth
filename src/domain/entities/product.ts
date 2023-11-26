import { randomUUID } from 'crypto';

export class Product {
  private _id: string;
  private _title: string;
  private _image: string;
  private _likes: number;

  constructor(id: string, title: string, image: string, likes: number = 0) {
    this._id = id ?? randomUUID();
    this._title = title;
    this._image = image;
    this._likes = likes;
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

  get image(): string {
    return this._image;
  }

  set image(newImage: string) {
    this._image = newImage;
  }

  get likes(): number {
    return this._likes;
  }

  set likes(newLikes: number) {
    this._likes = newLikes;
  }
}
