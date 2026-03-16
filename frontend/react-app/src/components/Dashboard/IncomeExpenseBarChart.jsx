import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { loadBarGraphData } from "../../fetchApi";

export default function IncomeExpenseBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const data = await loadBarGraphData();
      const rows = data.rows;
      const grouped = rows.reduce((acc, item) => {
        // Convert string date to JS Date
        const dateObj = new Date(item.month + "-01"); // '2026-01' → '2026-01-01'

        // Format as "Month Year"
        const monthYear = dateObj.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        // Example: 'Jan 2026', 'Dec 2025'

        if (!acc[monthYear]) {
          acc[monthYear] = { month: monthYear, income: 0, expense: 0 };
        }
        const key = item.type.toLowerCase(); // 'income' or 'expense'
        acc[monthYear][key] = parseFloat(item.total);
        return acc;
      }, {});

      // Step 2: convert to array
      setData(Object.values(grouped));
    };
    getDetails();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl ring-1 ring-white/5 min-w-[150px]">
          {/* The "label" is usually the Month/X-Axis value */}
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3 border-b border-white/5 pb-2">
            {label}
          </p>

          <div className="flex flex-col gap-3">
            {payload.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  {/* Dynamic neon dot based on bar color */}
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: entry.fill,
                      boxShadow: `0 0 8px ${entry.fill}`,
                    }}
                  />
                  <span className="text-zinc-300 text-xs capitalize">
                    {entry.name}
                  </span>
                </div>
                <span className="text-white text-sm font-bold">
                  ₹{entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="w-[90%] h-[40vh] md:w-[97.5%] md:h-[40vh]  flex justify-center items-center
                 bg-zinc-900 border border-[3px] rounded-sm  border-zinc-700 text-white px-3"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3939ff" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
            // This ensures the tooltip follows the mouse smoothly
            cursor={{ fill: "transparent" }}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend verticalAlign="top" height={36} />

          {/* Income bar */}
          <Bar
            dataKey="income"
            fill="#00FFD1"
            radius={[4, 4, 0, 0]}
            // This adds a subtle glow to the bar itself
            style={{ filter: "drop-shadow(0px 0px 4px #00FFD166)" }}
          />

          {/* Expense bar */}
          <Bar
            dataKey="expense"
            fill="#FF00E5"
            radius={[4, 4, 0, 0]}
            style={{ filter: "drop-shadow(0px 0px 4px #FF00E566)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
