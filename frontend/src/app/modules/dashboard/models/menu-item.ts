export interface MenuItem {

  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  children?: MenuItem[];

}
