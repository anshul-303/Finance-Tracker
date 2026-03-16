import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loadIncomeByCategory } from "../../fetchApi/DashboardApi/dashboardApi";

const COLORS = [
  "#FF00E5", // Neon Magenta / Pink
  "#7000FF", // Vivid Violet / Purple
  "#FF4D00", // Fluorescent Orange
  "#00FFD1", // Neon Aqua / Turquoise
  "#8320e0ff", // Electric Lime
  "#f636acff", // Bright Lemon Yellow
  "#0099FF", // Deep Electric Blue
];

export default function IncomePieChart() {
  const [incomeData, setIncomeData] = useState([]);
  const [notEmptyData, setNotEmptyData] = useState(false);

  useEffect(() => {
    const fetchIncomeData = async () => {
      const resData = await loadIncomeByCategory();
      const dataToParse = resData.rows;
      // console.log(typeof resData.rows[0].total); This returning string

      const cleanedData = dataToParse.map((item) => {
        return {
          category: item.category,
          total: parseInt(item.total) || 0, // Convert string to number
        };
      });
      setIncomeData(cleanedData);
      if (cleanedData.length > 0) setNotEmptyData(true);
    };

    fetchIncomeData();
  }, []);

  if (!notEmptyData)
    return (
      <div className="md:w-[49%] w-[99%] md:min-h-[60vh] h-[35vh] border rounded-sm flex flex-col justify-center items-center md:mb-4 gap-1">
        <h3 className="text-sm font-semibold text-zinc-300 px-4 pt-3">
          Income Distribution
        </h3>
        <div className="text-sm font-semibold text-zinc-300 px-4 pt-3">
          No data available!
        </div>
      </div>
    );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#121212]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
            Category
          </p>
          <p className="text-sm font-bold flex items-center gap-2">
            {/* Use .name and .value here */}
            <span
              style={{ color: payload[0].payload.fill }}
              className="text-lg"
            >
              ●
            </span>
            <span className="text-white">{payload[0].name}:</span>
            <span className="text-[#00FFD1]">
              ₹{payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (notEmptyData)
    return (
      <div className="md:w-[49%] w-[99%] md:min-h-[40vh] lg:min-h-[60vh] h-[45vh] border rounded-sm flex flex-col justify-center items-center md:mb-4 md:gap-7 lg:gap-2 gap-5">
        <h3 className="text-sm font-semibold text-zinc-300 px-4">
          Lifetime Income Distribution
        </h3>
        <div className="mb-2">
          <PieChart width={300} height={280}>
            <Pie data={incomeData} dataKey="total" nameKey="category" label>
              {incomeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
      </div>
    );
}
