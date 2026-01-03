import clsx from "clsx";

export default function GainLossCell({ value }: { value: number }) {
  return (
    <span
      className={clsx(
        "font-medium",
        value >= 0 ? "text-green-600" : "text-red-600"
      )}
    >
      {value.toFixed(2)}
    </span>
  );
}