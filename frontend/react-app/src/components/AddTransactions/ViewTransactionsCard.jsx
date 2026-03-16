export default function ViewTransactionsCard(props) {
  return (
    <div
      className="flex flex-col items-center md:gap-5 gap-3
                border border-zinc-700 rounded-lg
                w-[30%] min-h-[58vh] h-auto mr-[1rem]
                bg-zinc-900 text-zinc-200 pb-10 pt-4 box-border border-[2px] mr-[0.2rem]"
    >
      <div className="mt-4 text-[1rem] md:text-lg font-semibold tracking-wide text-white text-center">
        Recent Transactions
      </div>

      {props.latestTransactions.map((element, index) => {
        const isExpense = element.type === "Expense";

        return (
          <div
            key={index}
            className="md:w-[90%] md:h-[15%]  whitespace-wrap  w-[24vw] min-h-[8vh] h-auto border border-zinc-700 rounded-lg
                 bg-zinc-800 px-3 py-4 md:py-2 
                 flex flex-col justify-between box-border"
          >
            <div className="text-[0.6rem] md:text-sm font-medium text-white text-center md:text-start">
              {element.description}
            </div>

            <div className="flex md:flex-row flex-col md:justify-between justify-center items-center text-zinc-400">
              <div className="text-[0.6rem] md:text-sm ">{element.transactionDate}</div>

              <div
                className={`font-medium text-[0.6rem] md:text-sm  ${
                  isExpense ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {isExpense ? "-" : "+"}₹{element.amount}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
