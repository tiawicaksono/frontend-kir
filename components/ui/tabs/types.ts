export type TabFormProps = {
  close: () => void;
  mode: "create" | "edit";
  formData?: any;
};

export type TabItemConfig = {
  key: string;
  label: string;
  icon?: React.ReactNode;

  badge?: number;

  module: any;
  Table: any;
  Form?: any;

  showAction?: boolean;
  actionLabel?: string;

  actionType?: "modal" | "page" | "custom";
  onActionClick?: () => void;

  onViewPage?: (row: any) => void;
  onEditPage?: (row: any) => void;
};

export type AppTabsProps = {
  items: TabItemConfig[];
  defaultActiveKey?: string;
};
