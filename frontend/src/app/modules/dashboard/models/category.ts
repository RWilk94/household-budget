import {User} from "../../shared/models/user";
import {Module} from "./module";

export class Category {
  id: number;
  name: string;
  user: User;
  module: Module;
  isSpend: boolean;
  open?: boolean;
}
