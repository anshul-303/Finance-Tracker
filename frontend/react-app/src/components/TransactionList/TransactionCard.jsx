import { convertSQLDateToReadable } from "../../utilities";
import { deleteSpecificTransaction } from "../../fetchApi";

export default function TransactionCard(props) {
  return (
    // <div
    //   className="flex md:flex-row flex-col justify-center items-center gap-3 w-[95%] h-[8vh] rounded-lg px-[1rem]
    //             bg-zinc-900  text-white text-sm font-medium text-sm
    //              hover:bg-zinc-800 transition-colors duration-200"
    // >
    //   <div className="flex-1 justify-start text-zinc-300  ">
    //     {convertSQLDateToReadable(props.transactionDate)}
    //   </div>
    //   <div className="flex-[1]  text-zinc-300 justify-start ">
    //     {props.description}
    //   </div>
    //   <div className={props.typeFieldStyle}>{props.type}</div>
    //   <div className="flex-1 justify-start text-zinc-300 ">
    //     {props.category}
    //   </div>
    //   <div className="flex-1 justify-start text-zinc-300 ">₹{props.amount}</div>

    //   <div className="flex-1 flex justify-center">
    //     <button
    //       className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md
    //              text-white text-xs hover:bg-zinc-700
    //              transition-colors duration-200"
    //       onClick={() => {
    //         props.setShowModal(true);
    //         props.setTransactionToEditInfo({
    //           transactionId: props.transactionId,
    //           transactionDate: props.transactionDate,
    //           type: props.type,
    //           category: props.category,
    //           amount: props.amount,
    //           description: props.description,
    //         });
    //       }}
    //     >
    //       Edit Transaction
    //     </button>{" "}
    //   </div>

    //   <div className="flex-1 flex justify-center">
    //     <button
    //       className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md
    //              text-white text-xs hover:bg-zinc-700
    //              transition-colors duration-200"
    //       onClick={async () => {
    //         try {
    //           const data = await deleteSpecificTransaction(props.transactionId);

    //           // Only update if the delete was successful
    //           if (data && data.transactions) {
    //             props.setTransactions(data.transactions);
    //             props.toggleRefresh();
    //           }
    //         } catch (error) {
    //           console.error("Failed to delete:", error);
    //           alert("Could not delete transaction. Please try again.");
    //         }
    //       }}
    //     >
    //       Delete Transaction
    //     </button>{" "}
    //   </div>
    // </div>

    <div className="w-[95%]  md:items-center px-2 py-3 md:mb-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors duration-200">
      {/* Mobile */}
      <div className="md:hidden space-y-2 border border-zinc-700 rounded-lg p-2">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">Date</span>
          <span>{convertSQLDateToReadable(props.transactionDate)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">Description</span>
          <span>{props.description}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">Category</span>
          <span>{props.category}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">Type</span>
          <span className={props.typeFieldStyle}>{props.type}</span>
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-zinc-400">Amount</span>
          <span>₹{props.amount}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            className="flex-1 bg-zinc-800 border border-zinc-700 px-2 py-2 rounded-md text-white text-xs hover:bg-zinc-700 transition-colors duration-200"
            onClick={() => {
              props.setShowModal(true);
              props.setTransactionToEditInfo({
                transactionId: props.transactionId,
                transactionDate: props.transactionDate,
                type: props.type,
                category: props.category,
                amount: props.amount,
                description: props.description,
              });
            }}
          >
            Edit
          </button>
          <button
            className="flex-1 bg-zinc-800 border border-zinc-700 px-2 py-2 rounded-md text-white text-xs hover:bg-zinc-700 transition-colors duration-200"
            onClick={async () => {
              try {
                const data = await deleteSpecificTransaction(
                  props.transactionId
                );
                if (data && data.transactions) {
                  props.setTransactions(data.transactions);
                  props.toggleRefresh();
                }
              } catch (error) {
                console.error("Failed to delete:", error);
                alert("Could not delete transaction. Please try again.");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Desktop/Tablet */}
      <div className="hidden md:flex md:flex-row justify-center items-center gap-3 h-[6vh] text-sm font-medium">
        <div className="flex-1 justify-start text-zinc-300">
          {convertSQLDateToReadable(props.transactionDate)}
        </div>
        <div className="flex-1 text-zinc-300 justify-start pl-[11px] ">
          {props.description}
        </div>
        <div className={props.typeFieldStyle}>{props.type}</div>
        <div className="flex-1 justify-start text-zinc-300">
          {props.category}
        </div>
        <div className="flex-1 justify-start text-zinc-300">
          ₹{props.amount}
        </div>

        <div className="flex-1 flex justify-center">
          <button
            className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md
               text-white text-xs hover:bg-zinc-700
               transition-colors duration-200"
            onClick={() => {
              props.setShowModal(true);
              props.setTransactionToEditInfo({
                transactionId: props.transactionId,
                transactionDate: props.transactionDate,
                type: props.type,
                category: props.category,
                amount: props.amount,
                description: props.description,
              });
            }}
          >
            Edit Transaction
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md
               text-white text-xs hover:bg-zinc-700
               transition-colors duration-200"
            onClick={async () => {
              try {
                const data = await deleteSpecificTransaction(
                  props.transactionId
                );
                if (data && data.transactions) {
                  props.setTransactions(data.transactions);
                  props.toggleRefresh();
                }
              } catch (error) {
                console.error("Failed to delete:", error);
                alert("Could not delete transaction. Please try again.");
              }
            }}
          >
            Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
