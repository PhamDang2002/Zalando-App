export const currencyFormatter = (number, currency = "VND") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(number);
};

export const rateSale = (original, sale) =>
  Math.round(((original - sale) / original) * 100) + "%";
