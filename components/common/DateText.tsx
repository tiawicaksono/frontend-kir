import { formatDate } from "@/utils/formatDate";

interface DateTextProps {
  value?: string | Date;
  withTime?: boolean;
  format?: "short" | "long";
}

export default function DateText(props: DateTextProps) {
  return formatDate(props.value, {
    withTime: props.withTime,
    format: props.format,
  });
}
