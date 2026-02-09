export interface Menu {
  id: number;
  code: string;
  route?: string | null;
  icon?: string | null;
  children?: Menu[];
}
