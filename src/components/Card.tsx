
export default function Card({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <p className="text-sm text-gray-800">{title}</p>
      <p
        className={`text-2xl font-semibold   ${
          highlight
            ? value >= 0
              ? "text-green-600"
              : "text-red-600"
            : ""
        }`}
      >
        ₹ {value.toFixed(2)}
      </p>
    </div>
  )
}
