export default function getCurrencyName(isoCode, locale = "en-US") {
  try {
    // Use the Intl.NumberFormat API to format a number with the currency ISO code
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: isoCode,
    });

    // Extract the full currency name from the formatted string
    const parts = formatter.formatToParts(1);
    const currencyPart = parts.find((part) => part.type === "currency");

    // Return the currency name or fallback to 'Unknown Currency'
    return currencyPart?.value || "Unknown Currency";
  } catch (error) {
    console.error(`Error formatting currency code ${isoCode}:`, error);
    return "Unknown Currency";
  }
}
