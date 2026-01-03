"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PortfolioRow } from "@/types/portfolio";
import GainLossCell from "./GainLossCell";

interface Props {
  rows: PortfolioRow[];
}

export default function PortfolioTable({ rows }: Props) {
  const columns: ColumnDef<PortfolioRow>[] = [
    {
      header: "Stock",
      accessorKey: "symbol",
    },
    {
      header: "Exchange",
      accessorKey: "exchange",
    },
    {
      header: "Qty",
      accessorKey: "quantity",
      cell: (info) => (
        <span className="text-right block">{info.getValue<number>()}</span>
      ),
    },
    {
      header: "Buy Price",
      accessorKey: "purchasePrice",
      cell: (info) => (
        <span className="text-right block">
          {info.getValue<number>().toFixed(2)}
        </span>
      ),
    },
    {
      header: "CMP",
      accessorKey: "cmp",
      cell: (info) => (
        <span className="text-right block">
          {info.getValue<number>().toFixed(2)}
        </span>
      ),
    },
    {
      header: "Investment",
      accessorKey: "investment",
      cell: (info) => (
        <span className="text-right block">
          {info.getValue<number>().toFixed(2)}
        </span>
      ),
    },
    {
      header: "Present Value",
      accessorKey: "presentValue",
      cell: (info) => (
        <span className="text-right block">
          {info.getValue<number>().toFixed(2)}
        </span>
      ),
    },
    {
      header: "Gain / Loss",
      accessorKey: "gainLoss",
      cell: (info) => (
        <div className="text-right">
          <GainLossCell value={info.getValue<number>()} />
        </div>
      ),
    },
    {
      header: "P/E",
      accessorKey: "peRatio",
      cell: (info) => (
        <span className="text-right block">{info.getValue<string>()}</span>
      ),
    },
    {
      header: "Earnings",
      accessorKey: "latestEarnings",
      cell: (info) => (
        <span className="text-right block">
          {info.getValue<string>()}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-sm">
      <table className="min-w-full text-sm border-collapse text-gray-900">
        <thead className="bg-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold border border-gray-300 bg-gray-100 text-gray-700"
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

        <tbody className="text-gray-900">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition-colors`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border border-gray-300 text-gray-900">
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
  );
}