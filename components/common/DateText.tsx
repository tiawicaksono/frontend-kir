import { formatDate } from "@/utils/formatDate";

interface DateTextProps {
  value: string | Date | undefined;
  withTime?: boolean;
}

export default function DateText({ value, withTime = false }: DateTextProps) {
  if (!value) return <>-</>;

  const date = new Date(value);

  if (isNaN(date.getTime())) return <>-</>;

  return <>{withTime ? date.toLocaleString() : date.toLocaleDateString()}</>;
}
