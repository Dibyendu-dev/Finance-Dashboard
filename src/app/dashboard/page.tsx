"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioTable from "@/components/portfolio/PortfolioTable";
import SectorSummary from "@/components/portfolio/SectorSummary";
import { groupBySector } from "@/utils/groupBySector";

export default function Dashboard() {
  const { data, loading, error } = usePortfolio();

  if (loading) return <p className="p-6">Loading portfolio...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  const grouped = groupBySector(data);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>

      {Object.entries(grouped).map(([sector, rows]) => (
        <div key={sector} className="space-y-2">
          <SectorSummary sector={sector} rows={rows} />
          <PortfolioTable rows={rows} />
        </div>
      ))}
    </div>
  );
}
