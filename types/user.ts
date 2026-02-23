import { Menu } from "./menu";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  menus: Menu[];
}
