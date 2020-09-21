import {User} from "./user";

export class Token {
  id: number;
  createdAt: string;
  token: string;
  user: User;
}
