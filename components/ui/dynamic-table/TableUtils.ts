export function formatHeader(text: string) {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function isDate(value: any) {
  return typeof value === "string" && !isNaN(Date.parse(value));
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID");
}

export function isNumber(value: any) {
  return typeof value === "number";
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}
