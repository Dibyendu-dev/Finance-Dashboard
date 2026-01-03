"use client"
import { useState, useEffect } from "react"
import { fetchPortfolio } from "@/services/portfolio.api"
import { PortfolioRow } from "@/types/portfolio"

const REFRESH_INTERVAL = 15_000;

export function usePortfolio() {
  const [data, setData] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const response = await fetchPortfolio();
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
