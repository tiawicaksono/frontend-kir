export type DateFormatOptions = {
  withTime?: boolean;
  locale?: string;
};

export function formatDate(
  dateString: string | Date,
  options?: DateFormatOptions,
): string {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const { withTime = false, locale = "id-ID" } = options || {};

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }).format(date);
}
