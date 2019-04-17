export class ModuleVO {

  id: number;
  date?: Date;
  type?: string;
  open?: boolean;
  name: string;
  plannedSpending: number;
  actualSpending: number;
  percent?: number;
  difference?: number;

}
