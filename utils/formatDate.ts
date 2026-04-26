export type DateFormatOptions = {
  withTime?: boolean;
  locale?: string;
  format?: "short" | "long";
};

export function formatDate(
  dateString: string | Date | null | undefined,
  options?: DateFormatOptions,
): string {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  const { withTime = false, locale = "id-ID", format = "long" } = options || {};

  // =========================
  // SHORT FORMAT
  // =========================
  if (format === "short") {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let result = `${day}-${month}-${year}`;

    if (withTime) {
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      result += ` ${hour}:${minute}`;
    }

    return result;
  }

  // =========================
  // LONG DATE (TANPA JAM)
  // =========================
  const datePart = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);

  // =========================
  // TAMBAH JAM MANUAL
  // =========================
  if (withTime) {
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${datePart} ${hour}:${minute}`;
  }

  return datePart;
}
