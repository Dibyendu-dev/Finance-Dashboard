import { PortfolioRow } from "@/types/portfolio";

export default function SectorSummary({
  sector,
  rows,
}: {
  sector: string;
  rows: PortfolioRow[];
}) {
  const investment = rows.reduce((s, r) => s + r.investment, 0);
  const presentValue = rows.reduce((s, r) => s + r.presentValue, 0);
  const gainLoss = presentValue - investment;

  return (
    <div className="bg-gray-50 p-3 font-medium flex justify-between">
      <span>{sector}</span>
      <span>Investment: {investment}</span>
      <span>Value: {presentValue}</span>
      <span className={gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
        G/L: {gainLoss.toFixed(2)}
      </span>
    </div>
  );
}
