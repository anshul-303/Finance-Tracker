import SummaryDiv from "./Dashboard/SummaryDiv.jsx";
import IncomeExpenseBarChart from "./Dashboard/IncomeExpenseBarChart.jsx";
import IncomePieChart from "./Dashboard/IncomePieChart.jsx";
import ExpensePieChart from "./Dashboard/ExpensePieChart.jsx";
import PastTransactionCard from "./Dashboard/PastTransactionCard.jsx";
import Navbar from "./Navbar.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadLatestTransactions } from "../fetchApi/index.js";

export default function Dashboard(props) {
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const getRecentTransactions = async () => {
      const data = await loadLatestTransactions();
      // console.log(data.rows);
      setRecentTransactions(data.rows);
    };
    getRecentTransactions();
  }, []);

  return (
    <>
      <Navbar setIsLoggedIn={props.setIsLoggedIn} />
      <div
        className="w-screen
             bg-zinc-900 border-b border-zinc-700
             flex items-center justify-center
             text-white
             font-semibold text-lg tracking-wide
             py-1 "
      >
        Dashboard
      </div>
      <div className="w-[screen] min-h-[95vh] h-auto flex-col gap-2 bg-zinc-900 flex justify-center items-center text-white ">
        <SummaryDiv />
        <div className="border border-b-1px w-screen border-zinc-700 "></div>
        <div className=" w-screen border-zinc-700 my-1 flex justify-center items-center">
          Income vs Expense
        </div>
        <IncomeExpenseBarChart />
        <div className="border border-b-1px w-screen border-zinc-700 my-4 "></div>
        <div className="w-full min-h-[40vh] flex md:flex-row flex-col justify-center items-center text-white px-5 gap-5">
          <IncomePieChart />
          <ExpensePieChart />
        </div>
        <div
          className="w-screen text-white
             font-semibold text-lg tracking-wide font-medium flex items-center justify-center mb-2 pt-2 border-t border-zinc-700 "
        >
          Recent Transactions
        </div>

        <div className=" py-5 border border-zinc-700 rounded-sm border-[2px] md:w-[97%] w-[96%] md:min-h-[16vh] min-h-[60vh] flex flex-col justify-start items-center md:gap-3 gap-5 mb-9 ">
          {recentTransactions.map((element, index) => (
            <PastTransactionCard
              key={index}
              description={element.description}
              amount={element.amount}
              transactionDate={element.transactionDate}
              type={element.type}
            />
          ))}
          {/* <div className="w-[90%] my-2 justify-center flex items-center ">
            Click{" "}
            <span>
              <Link to="/view-transactions">here</Link>
            </span>{" "}
            to View All Transactions!
          </div> */}
          <div className="w-[90%] my-2 flex justify-center items-center text-sm md:text-base text-zinc-300">
            Click
            <span className="ml-1">
              <Link
                to="/view-transactions"
                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              >
                HERE
              </Link>
            </span>{" "}
            &nbsp;to view all transactions!
          </div>
        </div>
      </div>
    </>
  );
}
