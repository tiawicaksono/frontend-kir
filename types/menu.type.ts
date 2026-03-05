export interface Menu {
  id: number;
  code: string;
  parent_id: number | null;
  icon: string | null;
  route: string | null;
  order: number;
  is_active: boolean;
  children?: Menu[];
}
