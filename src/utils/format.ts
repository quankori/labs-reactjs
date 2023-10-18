export const formatCurrency = (number: number): string => {
  const formattedAmount = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedAmount.replace(/\.00$/, "");
};
