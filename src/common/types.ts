import { ObjectLiteral } from 'typeorm';

export interface UpdateResponse {
  generatedMaps: ObjectLiteral[];
  raw: string[];
  affected?: number;
}

export interface DeleteResponse {
  raw: string[];
  affected?: number;
}

export interface MovieData {
  title: string;
  description: string;
  year: number;
}

export interface UpdateUser {
  name: string;
}

export interface Payload {
  sub: string;
  email: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}
