import {User} from "../../shared/models/user";
import {Category} from "./category";

export class PlannedSpend {

  user: User;
  category: Category;
  year: number;
  month: number;
  value: number;
}
