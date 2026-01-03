"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { PortfolioRow } from "@/types/portfolio";
import GainLossCell from "./GainLossCell";

export default function PortfolioTable({
  rows,
}: {
  rows: PortfolioRow[];
}) {
  const [sorting, setSorting] = useState<any[]>([]);
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");

  const filteredRows =
    sectorFilter === "ALL"
      ? rows
      : rows.filter((r) => r.sector === sectorFilter);

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
        const total = rows.reduce(
          (s, r) => s + r.investment,
          0
        );
        return ((row.investment / total) * 100).toFixed(2) + "%";
      },
    },
    { header: "Exchange", accessorKey: "exchange" },
    { header: "CMP", accessorKey: "cmp" },
    {
      header: "Present Value",
      accessorKey: "presentValue",
    },
    {
      header: "Gain / Loss",
      accessorKey: "gainLoss",
      cell: (info) => (
        <GainLossCell value={info.getValue<number>()} />
      ),
    },
    { header: "P/E Ratio", accessorKey: "peRatio" },
    {
      header: "Latest Earnings",
      accessorKey: "latestEarnings",
    },
  ];

  const table = useReactTable({
    data: filteredRows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const sectors = Array.from(
    new Set(rows.map((r) => r.sector))
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <select
          className="border rounded px-3 py-1"
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
        >
          <option value="ALL">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm ">
          <thead className="bg-gray-100 ">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-3 cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
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
