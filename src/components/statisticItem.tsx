import React, { useState, useEffect } from "react";

interface StatisticItemProps {
  end: number;
  duration: number;
  label: string;
  prefix?: string;
  icon: React.ReactNode;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  end,
  duration,
  label,
  prefix = "",
  icon,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4 mr-4 text-blue-500">{icon}</div>
        <p className="text-3xl font-bold text-blue-600 mb-2">
          {prefix}
          {count.toLocaleString()}+
        </p>
        <p className="text-lg text-purple-600 font-medium text-center">
          {label}
        </p>
      </div>
    </div>
  );
};

export default StatisticItem;
