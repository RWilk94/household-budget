import {User} from "../../shared/models/user";
import {Module} from "./Module";

export class Category {
  id: number;
  name: string;
  user: User;
  module: Module;
  isSpend: boolean;
}
