import { useEffect, useState } from "react";
import { getSummary } from "../../fetchApi";

export default function SummaryDiv(props) {
  const [balance, setBalance] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [totalTransactions, setTotalTransactions] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getSummary();
      // console.log(res);
      setBalance(res.data.balance);
      setIncome(res.data.income);
      setExpense(res.data.expense);
      setTotalTransactions(res.data.totalTransactions);
    };
    getData();
  }, [props.trigger]);

  return (
    <>
      <div
        className="w-full h-[12vh] md:w-[97.5%] md:min-h-[12vh]  flex justify-center items-center gap-2 md:p-1 p-1 px-2 
                 bg-zinc-900 rounded-lg "
      >
        {/* Balance */}
        <div
          className="w-[25%] h-[90%] md:h-[90%] lg:h-full  border border-zinc-700 border-[2px] rounded-md
                  flex flex-col md:flex-row items-center gap-4 px-4 bg-zinc-800 pt-2 md:pt-0 "
        >
          <div
            className="flex justify-center items-center w-[30px] h-[30px] 
            md:w-[48px] md:h-[48px] 
                    bg-zinc-700 rounded-lg"
          >
            <img src="/walletIcon.png" alt="" width="28px" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-[0.75rem] md:text-xs text-zinc-400 uppercase tracking-wide text-center md:text-start">
              Balance
            </div>
            <div className="text-[0.75rem] md:text-lg font-semibold text-white text-center md:text-start">
              ₹{balance}
            </div>
          </div>
        </div>

        {/* Income */}
        <div
          className="w-[25%] h-[90%] md:h-[90%] lg:h-full  border border-zinc-700 border-[2px] rounded-md
                  flex flex-col md:flex-row lg:flex-row items-center gap-4 px-4 bg-zinc-800 pt-2 md:pt-0"
        >
          <div
            className="flex justify-center items-center w-[30px] h-[30px]  
            md:w-[48px] md:h-[48px] 
                    bg-zinc-700 rounded-lg"
          >
            <img src="/incomeIcon.png" alt="" width="26px" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-[0.75rem] md:text-xs text-zinc-400 uppercase tracking-wide text-center md:text-start">
              Income
            </div>
            <div className="text-[0.75rem] md:text-lg font-semibold text-emerald-400 text-center md:text-start">
              ₹{income}
            </div>
          </div>
        </div>

        {/* Expense */}
        <div
          className="w-[25%] h-[90%] md:h-[90%] lg:h-full  border border-zinc-700 border-[2px] rounded-md
                  flex flex-col md:flex-row lg:flex-row items-center gap-4 px-4 bg-zinc-800 pt-2 md:pt-0"
        >
          <div
            className="flex justify-center items-center w-[30px] h-[30px] 
            md:w-[48px] md:h-[48px] 
                    bg-zinc-700 rounded-lg"
          >
            <img src="/expenseIcon.png" alt="" width="26px" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-[0.75rem] md:text-xs text-zinc-400 uppercase tracking-wide text-center md:text-start">
              Expense
            </div>
            <div className="text-[0.75rem] md:text-lg font-semibold text-rose-400 text-center md:text-start">
              ₹{expense}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div
          className="w-[25%] h-[90%] md:h-[90%] lg:h-full  border border-zinc-700 border-[2px] rounded-md
                  flex flex-col md:flex-row lg:flex-row items-center gap-4 px-4 bg-zinc-800 pt-2 md:pt-0"
        >
          <div
            className="flex justify-center items-center w-[30px] h-[30px] 
            md:w-[48px] md:h-[48px] 
                    bg-zinc-700 rounded-lg"
          >
            <img src="/transactionIcon.png" alt="" width="28px" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-[0.75rem] md:text-xs text-zinc-400 uppercase tracking-wide text-center md:text-start">
              Transactions
            </div>
            <div className="text-[0.75rem] md:text-lg font-semibold text-white text-center md:text-start">
              {totalTransactions}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
