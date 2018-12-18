import {Category} from "./category";
import {User} from "../../shared/models/user";

export class Spend {
  id: number;
  name: string;
  category: Category;
  user: User;
  date: Date;
  value: number;
}
