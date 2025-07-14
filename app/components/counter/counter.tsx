import React, { useState } from "react";

interface CounterProps {
  initialValue?: number;
  step?: number;
}

export function Counter({ initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => prev + step);
  };

  const decrement = () => {
    setCount((prev) => prev - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-sm">
      <h2 className="text-2xl font-bold">{count}</h2>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Decrease
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Increase
        </button>
      </div>
    </div>
  );
}
