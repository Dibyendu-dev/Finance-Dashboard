import { holdings } from "@/data/holding";
import { EnrichedHolding } from "@/types/portfolio";
import { getCMP } from "./yahoo.service";
import { getFundamentalsFromYahoo } from "./yahoo.service";

export async function buildPortfolio(): Promise<EnrichedHolding[]> {
  const result: EnrichedHolding[] = [];

  for (const stock of holdings) {
    const { cmp } = await getCMP(stock.symbol, stock.exchange);
    const fundamentals = await getFundamentalsFromYahoo(
      stock.symbol,
      stock.exchange
    );

    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = cmp * stock.quantity;
    const gainLoss = presentValue - investment;

    result.push({
      ...stock,
      cmp,
      investment,
      presentValue,
      gainLoss,
      peRatio: fundamentals.peRatio,
      latestEarnings: fundamentals.latestEarnings,
    });
  }

  return result;
}
