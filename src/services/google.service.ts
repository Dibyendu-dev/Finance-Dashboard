import axios from "axios";
import * as cheerio from 'cheerio';
import { getCache, setCache } from "@/utils/cache";

interface Fundamentals {
  peRatio: string;
  latestEarnings: string;
}

export async function getFundamentals(
  symbol: string,
  exchange: "NSE" | "BSE"
): Promise<Fundamentals> {
  const cacheKey = `FUND_${symbol}_${exchange}`;
  const cached = getCache<Fundamentals>(cacheKey);
  if (cached) return cached;

  const url = `https://www.google.com/finance/beta/quote/${symbol}:${exchange}`;

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "en-US",
    },
  });

  const $ = cheerio.load(html);

  let peRatio = "N/A";
  let latestEarnings = "N/A";

  $("div").each((_, el) => {
    const text = $(el).text().trim();

    if (text === "P/E ratio") {
      peRatio = $(el).next().text().trim();
    }

    if (text === "Earnings") {
      latestEarnings = $(el).next().text().trim();
    }
  });

  const data = { peRatio, latestEarnings };

  setCache(cacheKey, data, 24 * 60 * 60 * 1000);
  return data;
}
