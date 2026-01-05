import clsx from "clsx";
import React from "react";

 function GainLossCell({ value }: { value: number }) {
  
  if (typeof value !== "number") return null;
  const isProfit = value >= 0;

  return (
    <span
      className={clsx(
        "font-medium text-lg",
        isProfit ? "text-green-600" : "text-red-600"
      )}
    >
      {value.toFixed(2)}
    </span>
  );
}

export default React.memo(GainLossCell);