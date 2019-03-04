import {User} from "../../shared/models/user";
import {Category} from "./category";

export class PlannedSpend {

  user: User;
  category: Category;
  date: Date;
  value: number;
}
