"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PortfolioRow } from "@/types/portfolio";
import GainLossCell from "./GainLossCell";

export default function PortfolioTable({
  rows,
  overallTotal,
}: {
  rows: PortfolioRow[];
  overallTotal?: number;
}) {
  const columns: ColumnDef<PortfolioRow>[] = [
    { header: "Stock Name", accessorKey: "symbol" },
    {
      header: "Purchase Price",
      accessorKey: "purchasePrice",
    },
    {
      header: "Qty",
      accessorKey: "quantity",
    },
    {
      header: "Investment",
      accessorKey: "investment",
    },
    {
      header: "Portfolio %",
      cell: (info) => {
        const row = info.row.original;
        const total =
          typeof overallTotal === "number"
            ? overallTotal
            : rows.reduce((s, r) => s + r.investment, 0);
        return ((row.investment / (total || 1)) * 100).toFixed(2) + "%";
      },
    },
    { header: "Exchange", accessorKey: "exchange" },
    { header: "CMP", accessorKey: "cmp" },
    {
      header: "Present Value",
      accessorKey: "presentValue",
      cell: (info) => {
        const v = info.getValue<number>();
        return typeof v === "number" ? v.toFixed() : v ?? "";
      },
    },
    {
      header: "Gain / Loss",
      accessorKey: "gainLoss",
      cell: (info) => <GainLossCell value={info.getValue<number>()} />,
    },
    { header: "P/E Ratio", accessorKey: "peRatio" },
    {
      header: "Latest Earnings",
      accessorKey: "latestEarnings",
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto  w3-container">
        <table className="min-w-full text-sm w3-table-all">
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
