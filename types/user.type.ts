import { Menu } from "./menu.type";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  menus: Menu[];
}
