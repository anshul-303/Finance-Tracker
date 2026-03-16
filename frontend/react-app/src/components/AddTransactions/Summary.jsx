export default function Summary(props) {
  return (
    <div className="w-full h-full flex justify-center items-center  py-[0.3rem] ">
      <div
        className="h-full w-[97%] border border-zinc-700 rounded-lg
               flex flex-col justify-center items-center
               bg-zinc-800
               text-zinc-200 font-medium
               transition-colors duration-200
               gap-2 md:gap-1 md:pl-3
               "
      >
        <div className="flex md:flex-row flex-col w-[100%]  h-[20%] items-center ">
          <div className="flex md:justify-start justify-center px-4  w-[45%]">
            Balance{" "}
          </div>
          <div className="flex md:justify-end justify-center  px-2 w-[45%] ">
            ₹{props.balance}{" "}
          </div>
        </div>
        <div className="flex md:flex-row flex-col w-[100%] h-[20%] items-center ">
          <div className="flex md:justify-start justify-center px-4  w-[45%]">
            Income{" "}
          </div>
          <div className="flex md:justify-end justify-center w-[45%]  text-emerald-400 px-2">
            ₹{props.income}{" "}
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-[100%] h-[20%] items-center ">
          <div className="flex md:justify-start justify-center px-4  w-[45%]  ">
            Expense{" "}
          </div>
          <div className="flex md:justify-end justify-center w-[45%]  px-2 text-rose-400 ">
            ₹{props.expense}{" "}
          </div>
        </div>
        <div className="flex md:flex-row flex-col  w-[100%] h-[20%] items-center ">
          <div className="flex md:justify-start justify-center px-4 w-[45%] ">
            Transactions{" "}
          </div>
          <div className="flex md:justify-end justify-center px-2 w-[45%]  ">
            {props.totalTransactions}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
