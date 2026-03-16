export default function PastTransactionCard({
  type,
  amount,
  description,
  transactionDate,
}) {
  return (
    // <div className="flex items-center justify-between px-4 border border-zinc-700 rounded-sm w-[92%] md:w-[97%] h-[15%] md:h-[20%]">
    //   <div className="w-[8%] h-[80%] flex items-center justify-center">
    //     <img
    //       src={type === "Expense" ? "/expenseIcon.png" : "/incomeIcon.png"}
    //       alt={type === "Expense" ? "Expense icon" : "Income icon"}
    //       className="p-1 border-[1.5px] border-zinc-700/50 rounded-lg w-10 h-10 object-contain"
    //     />
    //   </div>
    //   <div className="flex flex-col justify-center flex-1 ml-4">
    //     <span className="text-sm font-medium text-zinc-200">{description}</span>
    //     <span className="text-xs text-zinc-400 mt-1">Transaction Date</span>
    //   </div>
    //   <div
    //     className={`text-lg font-semibold ${
    //       type === "Income" ? "text-emerald-400" : "text-rose-400"
    //     }`}
    //   >
    //     ₹ {amount}
    //   </div>{" "}
    // </div>
    <div className="py-2 flex items-center justify-between px-4 border border-zinc-700/50 rounded-sm w-[92%] md:w-[97%] h-[15%] md:h-[20%] bg-zinc-900/20 hover:bg-zinc-800/40 transition-colors group">
      {/* ICON SECTION */}
      <div className="w-[8%] h-[80%] flex items-center justify-center">
        <img
          src={type === "Expense" ? "/expenseIcon.png" : "/incomeIcon.png"}
          alt={type === "Expense" ? "Expense icon" : "Income icon"}
          className="p-1.5 border-[1px] border-zinc-600/50 rounded-lg w-10 h-10 object-contain bg-zinc-800/50 shadow-sm"
        />
      </div>

      <div className="flex flex-col justify-center flex-1 ml-6">
        <span className="text-sm font-semibold text-zinc-300 tracking-tight group-hover:text-white transition-colors">
          {description}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-0.5">
          {transactionDate}
        </span>
      </div>

      <div
        className={`text-lg font-bold tracking-tighter ${
          type === "Income" ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {type === "Income" ? "+" : "-"} ₹{amount}
      </div>
    </div>
  );
}
