import axios from "axios";
import { load } from "cheerio";
import { getCache, setCache } from "@/utils/cache";

interface Fundamentals {
  peRatio: string;
  latestEarnings: string;
}

export async function getFundamentals(
  symbol: string,
  exchange: "NSE" | "BSE"
): Promise<Fundamentals> {
  const cacheKey = `FUND_${symbol}`;
  const cached = getCache<Fundamentals>(cacheKey);
  if (cached) return cached;

  const url = `https://www.google.com/finance/quote/${symbol}:${exchange}`;

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "en-US",
    },
  });

  const $ = load(html);

  const peRatio =
    $('div[data-attrid="PriceToEarningsRatio"]').text() || "N/A";

  const latestEarnings =
    $('div[data-attrid="Earnings"]').text() || "N/A";

  const data = { peRatio, latestEarnings };

  setCache(cacheKey, data, 24 * 60 * 60 * 1000); // 24h
  return data;
}
