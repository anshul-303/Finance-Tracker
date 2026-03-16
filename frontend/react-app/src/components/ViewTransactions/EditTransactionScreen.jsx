import { useEffect, useState } from "react";
import { editTransaction } from "../../fetchApi";

export default function EditTransactionScreen(props) {
  const [transactionId, setTransactionId] = useState(
    props.transactionToEditInfo.transactionId
  );
  const [type, setType] = useState(props.transactionToEditInfo.type);
  const [description, setDesc] = useState(
    props.transactionToEditInfo.description
  );
  const [amount, setAmount] = useState(props.transactionToEditInfo.amount);
  const [category, setCategory] = useState(
    props.transactionToEditInfo.category
  );
  const [transactionDate, setTransactionDate] = useState(
    props.transactionToEditInfo.transactionDate.slice(0, 10)
  );

  const handleEdit = async () => {
    const edit = {
      transactionId: transactionId,
      type: type,
      description: description,
      category: category,
      amount: amount,
      transactionDate: transactionDate,
    };

    const data = await editTransaction(edit, props.setShowModal);
    props.setEditedTrans(edit);
    props.toggleRefresh();
    props.setEditHappened(true);
    // console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center">
      <div className="h-[75vh] w-[80vw] md:h-[62vh] md:w-[60vw] lg:h-[80vh] lg:w-[50vw] gap-5 lg:gap-[0.25rem] md:gap-4 flex flex-col  p-5 border border-[2px] border-zinc-700 rounded-lg  bg-zinc-900 ">
        <div className="text-lg font-semibold text-zinc-200 flex justify-between items-center pr-2">
          Transaction Details
          <button
            className="w-[1.75rem] h-[1.6rem] border border-[2px] border-zinc-700 rounded-lg flex justify-center items-center text-[0.75rem]"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            x
          </button>
        </div>

        {/* Type */}
        <label className="text-sm text-zinc-400">Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className=" bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Description */}
        <label className="text-sm text-zinc-400">Description</label>
        <input
          value={description}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
          placeholder="Enter transaction description"
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Amount */}
        <label className="text-sm text-zinc-400">Amount</label>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
          placeholder="Enter transaction amount"
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Category */}
        <label className="text-sm text-zinc-400">Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

        {/* Date */}
        <label className="text-sm text-zinc-400">Date</label>
        <input
          value={transactionDate}
          onChange={(e) => {
            setTransactionDate(e.target.value);
          }}
          type="date"
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={handleEdit}
          className="mt-4  hover:bg-white transition-colors bg-zinc-200 text-zinc-900 font-medium py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
    // </div>
  );
}
