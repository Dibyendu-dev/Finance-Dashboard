export type Exchange = "NSE" | "BSE";

export interface Holding {
  symbol: string;
  exchange: Exchange;
  sector: string;
  purchasePrice: number;
  quantity: number;
}

export interface EnrichedHolding extends Holding {
  cmp: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  peRatio: string;
  latestEarnings: string;
}
