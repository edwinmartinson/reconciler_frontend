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
