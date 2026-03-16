import Navbar from "./Navbar.jsx";
import IncomeExpenseCard from "./AddTransactions/IncomeExpenseCard.jsx";
import Summary from "./AddTransactions/Summary.jsx";
import AddTransactionsCard from "./AddTransactions/AddTransactionsCard.jsx";
import ViewTransactionsCard from "./AddTransactions/ViewTransactionsCard.jsx";
import {
  postTransactionData,
  loadLatestTransactions,
  getSummary,
  getBalance,
} from "../fetchApi/index.js";
import { useEffect, useState } from "react";

export default function AddTransactions(props) {
  const [type, setType] = useState(" - ");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactiondate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [latestTransactions, setLatestTransactions] = useState([]);

  const [balance, setBalance] = useState("-");
  const [income, setIncome] = useState("-");
  const [expense, setExpense] = useState("-");
  const [totalTransactions, setTotalTransactions] = useState("-");

  //This is to get latest 5 transactions.
  useEffect(() => {
    const getData = async () => {
      const data = await loadLatestTransactions();
      setLatestTransactions(data.rows);
    };
    getData();
  }, []);

  const clearAllFields = () => {
    setType("");
    setDescription("");
    setCategory("");
    setAmount("");
    setTransactiondate(new Date().toISOString().split("T")[0]);
  };

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
  }, [latestTransactions]);

  const handleAddTransaction = async () => {
    const transactionData = {
      type: type,
      description: description,
      amount: amount,
      category: category,
      transactionDate: transactionDate,
    };

    const predata = await getBalance();
    // console.log(predata.balance); // Just prints the current account balance of any user before making transaction.
    if (
      Number(predata.balance) < Number(transactionData.amount) &&
      transactionData.type === "Expense"
    ) {
      clearAllFields();
      window.alert("Insufficient account balance for transaction!");
      return;
    }

    const data = await postTransactionData(transactionData);
    setLatestTransactions(data.rows);
    clearAllFields();
  };

  return (
    <>
      <Navbar setIsLoggedIn={props.setIsLoggedIn} />
      <div
        className="w-screen
             bg-zinc-900 border-b border-zinc-700
             flex items-center justify-center
             text-white
             font-semibold text-lg tracking-wide
             py-1"
      >
        Add Transactions
      </div>

      <div className="bg-zinc-900 w-screen min-h-[88vh] h-auto flex flex-col justify-top border-zinc-700  items-center text-white ">
        <div className="flex  gap-2 p-[1px] justify-center items-center min-w-[100%] w-auto h-[35vh]">
          <div className="flex flex-col justify-around items-center rounded-lg  w-[70%] h-[32vh] gap-1">
            <div>Transaction Type : {type}</div>
            <IncomeExpenseCard type={type} setType={setType} />
          </div>
          <div className="flex flex-col gap-1 justify-around items-center rounded-lg w-[30%] h-[32vh] mr-[1rem] whitespace-nowrap ">
            Summary
            <Summary
              balance={balance}
              expense={expense}
              income={income}
              totalTransactions={totalTransactions}
            />
          </div>
        </div>
        <div className="flex justify-top items-top ml-[0.2rem] gap-2  w-[100%] min-h-[60vh] p-[0.1rem] h-auto">
          <AddTransactionsCard
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            transactionDate={transactionDate}
            setTransactiondate={setTransactiondate}
            handleAddTransaction={handleAddTransaction}
          />
          <ViewTransactionsCard latestTransactions={latestTransactions} />
        </div>
      </div>
    </>
  );
}
