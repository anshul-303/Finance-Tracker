import Navbar from "./Navbar.jsx";
import SummaryDiv from "./ViewTransactions/SummaryDiv.jsx";
import TransactionsList from "./ViewTransactions/TransactionsList.jsx";
import EditTransactionScreen from "./ViewTransactions/EditTransactionScreen.jsx";
import { useEffect, useState } from "react";
export default function ViewTransactions(props) {
  const [trigger, setTrigger] = useState(false);
  const toggleRefresh = () => setTrigger((prev) => !prev);

  const [showModal, setShowModal] = useState(false);
  const [transactionToEditInfo, setTransactionToEditInfo] = useState({});

  const [editHappened, setEditHappened] = useState(false);

  const [editedTrans, setEditedTrans] = useState({});

  // useEffect(() => {
  //   console.log(trigger);
  // }, [trigger]);

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
        View Transactions
      </div>
      <div className="w-screen min-h-[90vh] h-auto flex-col gap-2 bg-zinc-900 flex justify-start items-center text-white p-1">
        {showModal && (
          <EditTransactionScreen
            toggleRefresh={toggleRefresh}
            setShowModal={setShowModal}
            transactionToEditInfo={transactionToEditInfo}
            editHappened={editHappened}
            setEditedTrans={setEditedTrans}
            setEditHappened={setEditHappened}
          />
        )}
        <SummaryDiv trigger={trigger} />
        <TransactionsList
          toggleRefresh={toggleRefresh}
          transactionToEditInfo={transactionToEditInfo}
          setTransactionToEditInfo={setTransactionToEditInfo}
          setShowModal={setShowModal}
          editedTrans={editedTrans}
          editHappened={editHappened}
          setEditHappened={setEditHappened}
        />
      </div>
    </>
  );
}
