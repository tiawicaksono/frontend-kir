export type TabItemConfig = {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  badgeCount?: number;
  // 🔥 optional features
  showAction?: boolean;
  actionLabel?: string;

  // 🔥 custom action (modal/form biasa)
  actionType?: "modal" | "custom"; // default: modal
  onActionClick?: () => void;

  renderForm?: (close: () => void) => React.ReactNode;
};

export type AppTabsProps = {
  items: TabItemConfig[];
  defaultActiveKey?: string;
};
