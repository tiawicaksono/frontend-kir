export type TabFormProps = {
  close: () => void;
  mode: "create" | "edit";
  formData?: any;
};

export type TabItemConfig = {
  key: string;
  label: React.ReactNode;
  children: (props: { openEdit: (data: any) => void }) => React.ReactNode;
  badgeCount?: number;

  // 🔥 action button
  showAction?: boolean;
  actionLabel?: string;

  // 🔥 custom action (modal/form biasa)
  actionType?: "modal" | "custom"; // default: modal
  onActionClick?: () => void;

  // 🔥 FORM RENDER (CREATE + EDIT)
  renderForm?: (props: TabFormProps) => React.ReactNode;
};

export type AppTabsProps = {
  items: TabItemConfig[];
  defaultActiveKey?: string;
};
