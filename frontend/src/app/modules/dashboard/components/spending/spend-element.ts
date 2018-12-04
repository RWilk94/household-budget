import {Module} from "../../models/module";
import {Category} from "../../models/category";

export class SpendElement {
  position: number;
  name: string;
  module: Module;
  category: Category;
  date: Date;
  value: number;
  isCustom: boolean; //says if category is added by user or by system
  isEditing: boolean;
  isNew: boolean;
}
