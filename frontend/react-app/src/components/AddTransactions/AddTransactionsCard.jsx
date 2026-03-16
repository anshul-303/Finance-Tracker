export default function AddTransactionsCard(props) {
  return (
    // <div className="flex flex-col p-5 border border-[2px] border-zinc-700 rounded-lg w-[70%] min-h-[58vh] h-auto">
    //   <div>Transaction Details</div>
    //   <div>Description</div>
    //   <input type="text" placeholder="Enter transaction description" />
    //   <div>Amount</div>
    //   <input type="text" placeholder="Enter transaction amount" />
    //   <div>Category</div>
    //   <select className="bg-zinc-800">
    //     <option value="Entertainment">Entertainment</option>
    //     <option value="Food">Food</option>
    //     <option value="Fuel">Fuel</option>
    //     <option value="Shopping">Shopping</option>
    //     <option value="Salary">Salary</option>
    //     <option value="Freelance">Freelance</option>
    //   </select>
    //   <div>Date</div>
    //   <input type="date" />
    //   <button>Add Transaction</button>
    // </div>

    <div
      className="flex flex-col p-5 border border-[2px] border-zinc-700 rounded-lg w-[70%] min-h-[58vh] h-auto
                bg-zinc-900 text-zinc-200 md:gap-6 gap-4 lg:gap-3"
    >
      <div className="text-lg font-semibold tracking-wide text-white border-b border-zinc-700 pb-2">
        Transaction Details
      </div>

      <div className="text-sm text-zinc-400">Description</div>
      <input
        type="text"
        value={props.description}
        onChange={(e) => {
          props.setDescription(e.target.value);
        }}
        placeholder="Enter transaction description"
        className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2
               text-zinc-200 placeholder-zinc-500
               focus:outline-none focus:border-zinc-500"
      />

      <div className="text-sm text-zinc-400">Amount</div>
      <input
        type="text"
        value={props.amount}
        onChange={(e) => {
          props.setAmount(e.target.value);
        }}
        placeholder="Enter transaction amount"
        className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2
               text-zinc-200 placeholder-zinc-500
               focus:outline-none focus:border-zinc-500"
      />

      <div className="text-sm text-zinc-400">Category</div>
      <select
        value={props.category}
        onChange={(e) => {
          props.setCategory(e.target.value);
        }}
        className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2
               text-zinc-200
               focus:outline-none focus:border-zinc-500"
      >
        <option value="">Choose an option</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Fuel">Fuel</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
        <option value="Pharmaceutical">Pharmaceutical</option>
        <option value="Utilities">Utilities</option>
        <option value="Salary">Salary</option>
        <option value="Freelance">Freelance</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>

      <div className="text-sm text-zinc-400">Transaction Date</div>
      <input
        type="date"
        value={props.transactiondate}
        onChange={(e) => {
          props.setTransactiondate(e.target.value);
        }}
        className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2
               text-zinc-200
               focus:outline-none focus:border-zinc-500"
      />

      <button
        onClick={props.handleAddTransaction}
        className="mt-4 bg-zinc-200 text-zinc-900 font-medium
               rounded-md py-2
               hover:bg-white transition-colors"
      >
        Add Transaction
      </button>
    </div>
  );
}
