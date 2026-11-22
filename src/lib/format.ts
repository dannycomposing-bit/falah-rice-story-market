const faNumber = new Intl.NumberFormat("fa-IR");

/** Formats a Toman amount with Persian digits and thousands separators, e.g. "۲٬۱۵۰٬۰۰۰ تومان". */
export function formatToman(amount: number): string {
  return `${faNumber.format(amount)} تومان`;
}

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)] ?? d);
}
