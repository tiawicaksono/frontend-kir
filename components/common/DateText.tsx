import { formatDate } from "@/utils/formatDate";

interface DateTextProps {
  value: string | Date;
  withTime?: boolean;
}

export default function DateText({ value, withTime = false }: DateTextProps) {
  return <>{formatDate(value, { withTime })}</>;
}
