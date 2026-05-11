import { Tag } from "antd";
import dayjs from "dayjs";

export const ColumnFormatters = {
  date: (format = "DD/MM/YYYY") => ({
    render: (value: any) => (value ? dayjs(value).format(format) : "-"),
  }),

  number: () => ({
    render: (value: any) => {
      if (value === null || value === undefined) return "-";
      return new Intl.NumberFormat("id-ID").format(value);
    },
  }),

  currency: (prefix = "Rp") => ({
    render: (value: any) => {
      if (!value) return "-";
      return `${prefix} ${new Intl.NumberFormat("id-ID").format(value)}`;
    },
  }),

  bold: () => ({
    render: (value: any) => <strong>{value || "-"}</strong>,
  }),

  tag: (color = "blue") => ({
    render: (value: any) => (value ? <Tag color={color}>{value}</Tag> : "-"),
  }),
};
