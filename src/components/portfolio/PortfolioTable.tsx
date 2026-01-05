"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PortfolioRow } from "@/types/portfolio";
import GainLossCell from "./GainLossCell";
import { useMemo } from "react";

export default function PortfolioTable({
  rows,
  overallTotal,
}: {
  rows: PortfolioRow[];
  overallTotal?: number;
}) {

  const data = useMemo(() => rows, [rows]);

  const totalInvestment = useMemo(() => {
    return typeof(overallTotal) === "number"
      ? overallTotal
      : rows.reduce((sum, r) => sum + r.investment, 0);
  }, [overallTotal, rows]);

  const columns = useMemo<ColumnDef<PortfolioRow>[]>(
    () => [
      { header: "Stock Name", accessorKey: "symbol" },
      { header: "Purchase Price", accessorKey: "purchasePrice" },
      { header: "Qty", accessorKey: "quantity" },
      { header: "Investment", accessorKey: "investment" },

      {
        header: "Portfolio %",
        cell: (info) =>
          (
            (info.row.original.investment / (totalInvestment || 1)) *
            100
          ).toFixed(2) + "%",
      },

      { header: "Exchange", accessorKey: "exchange" },
      { header: "CMP", accessorKey: "cmp" },

      {
        header: "Present Value",
        accessorKey: "presentValue",
        cell: (info) => {
          const v = info.getValue<number>() ;
          return typeof v === "number" ? v.toFixed(2) : "";
        },
      },

      {
        header: "Gain / Loss",
        accessorKey: "gainLoss",
        cell: (info) => (
          <GainLossCell value={info.getValue<number>() } />
        ),
      },

      { header: "P/E Ratio", accessorKey: "peRatio" },
      { header: "Latest Earnings", accessorKey: "latestEarnings" },
    ],
    [totalInvestment]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto  w3-container">
        <table className="min-w-full text-sm border-collapse w3-table-all">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left font-semibold border-b"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
