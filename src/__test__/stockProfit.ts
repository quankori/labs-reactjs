export const maxProfit = (stockPriceList: number[]): number => {
  if (!stockPriceList || stockPriceList.length < 2) {
    return 0;
  }
  let minPrice = stockPriceList[0];
  let maxProfit = 0;

  for (let i = 1; i < stockPriceList.length; i++) {
    const currentPrice = stockPriceList[i];
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    } else if (currentPrice - minPrice > maxProfit) {
      maxProfit = currentPrice - minPrice;
    }
  }
  return maxProfit;
};
