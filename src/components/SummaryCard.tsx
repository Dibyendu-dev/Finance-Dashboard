import { PortfolioRow } from "@/types/portfolio"
import Card from "./Card";

export default function SummaryCard({ rows }: { rows: PortfolioRow[] }) {

   const totalInvestment = rows.reduce(
    (sum, r) => sum + r.investment,
    0
  );

  const currentValue = rows.reduce(
    (sum, r) => sum + r.presentValue,
    0
  );

  const overallReturn = currentValue - totalInvestment;

  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Investment" value={totalInvestment}  />
      <Card title="Current Value" value={currentValue} />
      <Card
        title="Overall Return"
        value={overallReturn}
        highlight
      />
    </div>
  )
}
