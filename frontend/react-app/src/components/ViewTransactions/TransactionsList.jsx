import { useEffect, useState } from "react";
import { getAllTransactions } from "../../fetchApi";
import TransactionCard from "../TransactionList/TransactionCard";

export default function TransactionsList(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllTransactions();
      // console.log(data.data.length);

      setTransactions(data.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const updateTransactions = () => {
      if (
        props.editedTrans &&
        props.editHappened &&
        Object.keys(props.editedTrans).length > 0
      ) {
        setTransactions((prevTransactions) => {
          return prevTransactions.map((item) => {
            // Use == instead of === to ignore string vs number differences
            if (item.transactionId == props.editedTrans.transactionId) {
              return props.editedTrans;
            }
            return item;
          });
        });
        props.setEditHappened(false);
      }
    };

    updateTransactions();
  }, [props.editHappened, props.editedTrans, props.setEditHappened]);

  const expenseCSS = "md:flex-1 md:justify-start text-rose-400";
  const incomeCSS = "md:flex-1 md:justify-start text-emerald-400";
  const hasNoTransactions = transactions.length === 0;

  return (
    <div
      className="w-[97%] md:min-h-[30vh] min-h-[12vh] h-auto flex flex-col gap-2 justify-start items-center 
                 bg-zinc-900 border border-zinc-700 border-[2px] rounded-lg "
    >
      <div className="pt-2 ">All Transactions</div>
      <div
        className="hidden md:flex justify-center items-center gap-3 w-[95%] h-[8vh] rounded-lg px-[1rem] 
                bg-zinc-900 border border-zinc-700 text-white text-sm font-medium"
      >
        <div className="flex-1 justify-start text-zinc-300">Date</div>
        <div className="flex-[1] justify-start text-zinc-300 ">Description</div>
        <div className="flex-1 justify-start text-zinc-300 pl-1">Type</div>
        <div className="flex-1 justify-start text-zinc-300">Category</div>
        <div className="flex-1 justify-start text-zinc-300">Amount</div>
        <div className="flex-1 flex justify-center text-zinc-300">Edit</div>
        <div className="flex-1 flex justify-center text-zinc-300">Delete</div>
      </div>{" "}
      {hasNoTransactions ? (
        <p className="mt-3">No transactions yet!</p>
      ) : (
        transactions.map((element, index) => {
          return (
            <TransactionCard
              key={element.transactionId}
              transactionId={element.transactionId}
              transactionDate={element.transactionDate}
              type={element.type}
              category={element.category}
              amount={element.amount}
              description={element.description}
              typeFieldStyle={
                element.type === "Expense" ? expenseCSS : incomeCSS
              }
              setTransactions={setTransactions}
              toggleRefresh={props.toggleRefresh}
              setTransactionToEditInfo={props.setTransactionToEditInfo}
              setShowModal={props.setShowModal}
            />
          );
        })
      )}
    </div>
  );
}
