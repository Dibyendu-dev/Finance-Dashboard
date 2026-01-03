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

export interface PortfolioRow {
  symbol: string;
  exchange: Exchange;
  sector: string;
  purchasePrice: number;
  quantity: number;
  cmp: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  peRatio: string;
  latestEarnings: string;
}

export interface PortfolioApiResponse {
  success: boolean;
  data: PortfolioRow[];
  timestamp: string;
}