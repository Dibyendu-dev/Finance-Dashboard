"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioTable from "@/components/portfolio/PortfolioTable";
import SummaryCard from "@/components/SummaryCard";

export default function Dashboard() {
  const { data, loading, error } = usePortfolio();

  if (loading) return <p className="p-6">Loading portfolio...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Portfolio Dashboard
      </h1>

      <SummaryCard rows={data} />

      <PortfolioTable rows={data} />
    </div>
  );
}
