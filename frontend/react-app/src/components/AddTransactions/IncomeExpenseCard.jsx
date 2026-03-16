export default function IncomeExpenseCard(props) {
  return (
    <div className="w-full h-full flex justify-center items-center p-[0.3rem] gap-2">
      <button
        onClick={() => props.setType("Income")}
        className="h-full w-[50%] border border-zinc-700 rounded-lg
               flex flex-col justify-center items-center
               bg-zinc-800
                active:bg-zinc-600
               text-zinc-200
               hover:border-zinc-500 hover:bg-zinc-900
               transition-colors duration-200"
      >
        <img
          src="/incomeIcon.png"
          alt="Income icon"
          className="w-[4rem] h-[4rem] opacity-90"
        />

        <div className="mt-2 text-lg font-semibold tracking-wide">Income</div>

        <div className="text-sm text-zinc-400">Money received</div>
      </button>

      <button
        onClick={() => props.setType("Expense")}
        className="h-full w-[50%] border border-zinc-700 rounded-lg
               flex flex-col justify-center items-center
               bg-zinc-800
               active:bg-zinc-600
               text-zinc-200
               hover:border-zinc-500 hover:bg-zinc-900
               transition-colors duration-200"
      >
        <img
          src="/expenseIcon.png"
          alt="Expense icon"
          className="w-[4rem] h-[4rem] opacity-90"
        />

        <div className="mt-2 text-lg font-semibold tracking-wide">Expense</div>

        <div className="text-sm text-zinc-400">Money spent</div>
      </button>
    </div>
  );
}
