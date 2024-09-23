/**
 * Formats a number as a string with decimal places according to the specified locale.
 * @param {number} value - The number to format.
 * @param {string} [locale="en-US"] - The locale to use for the formatting.
 * @param {number} [minimumFractionDigits=2] - The minimum number of fraction digits to include.
 * @param {number} [maximumFractionDigits=2] - The maximum number of fraction digits to include.
 * @returns {string} The formatted string.
 */
const formatAmount = (
  value,
  locale = "en-US",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) => {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

export default formatAmount;
