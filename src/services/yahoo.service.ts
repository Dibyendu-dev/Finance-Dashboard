import YahooFinance from "yahoo-finance2";
import { getCache, setCache } from "@/utils/cache";

interface YahooCMP {
  cmp: number;
}

export async function getCMP(
  symbol: string,
  exchange: "NSE" | "BSE"
): Promise<YahooCMP> {
  const cacheKey = `CMP_${symbol}`;
  const cached = getCache<YahooCMP>(cacheKey);
  if (cached) return cached;

  const ticker = exchange === "NSE" ? `${symbol}.NS` : `${symbol}.BO`;
  const yahooFinance = new YahooFinance();
  const quote = await yahooFinance.quote(ticker);

  const data = {
    cmp: quote.regularMarketPrice ?? 0,
  };

  setCache(cacheKey, data, 15 * 1000); // 15 sec
  return data;
}
