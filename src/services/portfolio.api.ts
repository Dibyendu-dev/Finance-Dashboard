import { PortfolioApiResponse } from "@/types/portfolio";

export async function fetchPortfolio(): Promise<PortfolioApiResponse> {
  const res = await fetch("/api/portfolio", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}