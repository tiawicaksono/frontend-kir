export interface User {
  id: number;
  roleId: number;
  name: string;
  email: string;
  password: string;
  menus?: { id: number; route: string | null }[];
}
