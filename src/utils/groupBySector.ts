import { PortfolioRow } from "@/types/portfolio";

export function groupBySector(rows: PortfolioRow[]) {
  return rows.reduce((acc, row) => {
    acc[row.sector] = acc[row.sector] || [];
    acc[row.sector].push(row);
    return acc;
  }, {} as Record<string, PortfolioRow[]>);
}
