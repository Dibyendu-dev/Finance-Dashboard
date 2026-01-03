/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
  const quote = await yahooFinance.quote(ticker);

  const data = {
    cmp: quote.regularMarketPrice ?? 0,
  };

  setCache(cacheKey, data, 15 * 1000); // 15 sec
  return data;
}

export async function getFundamentalsFromYahoo(
  symbol: string,
  exchange: "NSE" | "BSE"
) {
  const cacheKey = `FUNDAMENTALS_${symbol}_${exchange}`;

   const cached = getCache<{
    peRatio: string;
    latestEarnings: string;
  }>(cacheKey);

  if (cached) return cached;

  const ticker = exchange === "NSE" ? `${symbol}.NS` : `${symbol}.BO`;
  const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

  try {
    const quote = await yahooFinance.quoteSummary(ticker, {
      modules: ["summaryDetail", "defaultKeyStatistics", "earnings"],
    });
    
    // console.log(JSON.stringify(quote, null, 2)); 

    // Extract P/E Ratio
    let peRatio = "N/A";
    if (quote.defaultKeyStatistics?.trailingPE) {
      peRatio = typeof quote.defaultKeyStatistics.trailingPE === 'number' 
        ? quote.defaultKeyStatistics.trailingPE.toFixed(2)
        : quote.defaultKeyStatistics.trailingPE.toString();
    } else if (quote.summaryDetail?.trailingPE) {
      peRatio = typeof quote.summaryDetail.trailingPE === 'number'
        ? quote.summaryDetail.trailingPE.toFixed(2)
        : quote.summaryDetail.trailingPE.toString();
    }

    // Extract Latest Earnings
    let latestEarnings = "N/A";
    if (quote.earnings?.earningsChart?.quarterly && 
        quote.earnings.earningsChart.quarterly.length > 0) {
      const latest = quote.earnings.earningsChart.quarterly[
        quote.earnings.earningsChart.quarterly.length - 1
      ];
      if (latest.actual) {
        latestEarnings = typeof latest.actual === 'number'
          ? latest.actual.toFixed(2)
          : latest.actual.toString();
      }
    }

    const result = { peRatio, latestEarnings };

    
    setCache(cacheKey, result,  24 * 60 * 60 * 1000);

    return result;
  } catch (error) {
    console.error(`Error fetching fundamentals for ${ticker}:`, error);
    return {
      peRatio: "N/A",
      latestEarnings: "N/A",
    };
  }
}
