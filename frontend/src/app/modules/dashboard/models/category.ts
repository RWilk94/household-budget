import {User} from '../../shared/models/user';
import {Module} from './module';
import {PlannedSpend} from './planned-spend';

export class Category {
  id: number;
  name: string;
  user: User;
  module: Module;
  isSpend: boolean;
  open?: boolean;
  plannedSpending: PlannedSpend[];
  amountPlannedSpending?: number;
}
