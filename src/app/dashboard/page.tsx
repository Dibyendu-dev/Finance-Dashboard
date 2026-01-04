"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioTable from "@/components/portfolio/PortfolioTable";
import SummaryCard from "@/components/SummaryCard";
import { groupBySector } from "@/utils/groupBySector";
import SectorSummary from "@/components/portfolio/SectorSummary";

export default function Dashboard() {
  const { data, loading, error } = usePortfolio();

  if (loading) return <p className="p-6">Loading portfolio...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  const grouped = groupBySector(data);
  const totalInvestment = data.reduce((s, r) => s + r.investment, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>

      <SummaryCard rows={data} />

      {Object.entries(grouped).map(([sector, rows]) => (
        <div key={sector} className="space-y-2">
          <SectorSummary sector={sector} rows={rows} />
          <PortfolioTable rows={rows} overallTotal={totalInvestment} />
        </div>
      ))}
    </div>
  );
}
