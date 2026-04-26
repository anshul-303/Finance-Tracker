import { logoutUser } from "../fetchApi";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../contexts/userDataContext";
import { CurrentPageContext } from "../contexts/CurrentPageContext";

export default function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { username, setUsername, getUsername } = useContext(UserDataContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);

  const updateNavPage = (pageName) => {
    setCurrentPage(pageName);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    // <div className="bg-zinc-900 w-screen h-[12vh] border border-[2px] border-zinc-700 flex flex-col md:flex-row lg:flex-row  justify-around items-center text-white">
    //   <div className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-100 select-none">
    //     Finance <span className="text-zinc-600">/</span> Tracker
    //   </div>
    //   <div className="flex items-center">
    //     <Link
    //       to="/dashboard"
    //       className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 tracking-wide"
    //     >
    //       Dashboard
    //     </Link>
    //   </div>

    //   <div className="flex items-center">
    //     <Link
    //       to="/add-transactions"
    //       className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 tracking-wide"
    //     >
    //       Add transactions
    //     </Link>
    //   </div>

    //   <div className="flex items-center">
    //     <Link
    //       to="/view-transactions"
    //       className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 tracking-wide"
    //     >
    //       View transactions
    //     </Link>
    //   </div>
    //   <button
    //     onClick={async () => {
    //       await logoutUser(props.setIsLoggedIn);
    //     }}
    //     className="w-[20vh] h-[6.5vh] flex justify-center items-center bg-black text-white py-2 my-[0.5rem] rounded-md font-medium hover:bg-zinc-800 transition active:bg-zinc-900 border border-[2px] border-zinc-700"
    //   >
    //     Log out
    //   </button>
    // </div>
    <header className="bg-zinc-900 border-b border-zinc-700 text-white w-full">
      {/* ===== Mobile Navbar ===== */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <div className="text-sm font-medium tracking-[0.2em] uppercase select-none mr-2">
          Finance <span className="text-zinc-600">/</span> Tracker
        </div>

        <div className="flex flex-col text-[0.6em] px-1 py-2 font-medium h-[8vw] w-[15vw] text-center justify-center items-center border border-[1px] border-zinc-700 rounded-sm">
          Hello {username}!
        </div>
        <button
          onClick={async () => {
            setMenuOpen(false);
            await logoutUser(props.setIsLoggedIn);
          }}
          className=" px-3 py-1 border border-zinc-700 rounded-md hover:bg-zinc-800 ml-3"
        >
          Log out
        </button>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="border px-3 py-1 border-zinc-700  rounded-md hover:bg-zinc-800"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-700">
          <nav className="flex flex-col px-4 py-2 gap-3 text-center">
            <Link
              to="/dashboard"
              onClick={() => {
                setMenuOpen(false);
                updateNavPage("Dashboard");
              }}
              className={`nav-link ${
                currentPage === "Dashboard" ? `bg-zinc-700` : ""
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/add-transactions"
              onClick={() => {
                setMenuOpen(false);
                updateNavPage("Add Transactions");
              }}
              className={`nav-link ${
                currentPage === "Add Transactions" ? `bg-zinc-700` : ""
              }`}
            >
              Add transactions
            </Link>

            <Link
              to="/view-transactions"
              onClick={() => {
                setMenuOpen(false);
                updateNavPage("View Transactions");
              }}
              className={`nav-link ${
                currentPage === "View Transactions" ? `bg-zinc-700` : ""
              }`}
            >
              View transactions
            </Link>
            <Link
              to="/ai-dash"
              onClick={() => {
                setMenuOpen(false);
                updateNavPage("AI-Dashboard");
              }}
              className={`nav-link ${
                currentPage === "AI-Dashboard" ? `bg-zinc-700` : ""
              }`}
            >
              AI Dashboard
            </Link>
          </nav>
        </div>
      )}

      {/* ===== Desktop Navbar ===== */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="text-sm font-medium tracking-[0.2em] uppercase select-none">
          Finance <span className="text-zinc-600">/</span> Tracker
        </div>

        {/* Links */}
        <nav className="flex gap-8">
          <Link
            to="/dashboard"
            className={`nav-link ${
              currentPage === "Dashboard"
                ? `border border-zinc-700 rounded-sm px-1`
                : ""
            }`}
            onClick={() => updateNavPage("Dashboard")}
          >
            Dashboard
          </Link>
          <Link
            to="/add-transactions"
            className={`nav-link ${
              currentPage === "Add Transactions"
                ? `border border-zinc-700 rounded-sm px-1 `
                : ""
            }`}
            onClick={() => updateNavPage("Add Transactions")}
          >
            Add transactions
          </Link>
          <Link
            to="/view-transactions"
            className={`nav-link ${
              currentPage === "View Transactions"
                ? `border border-zinc-700 rounded-sm px-1`
                : ""
            }`}
            onClick={() => updateNavPage("View Transactions")}
          >
            View transactions
          </Link>

          <Link
            to="/ai-dash"
            className={`nav-link ${
              currentPage === "AI-Dashboard"
                ? `border border-zinc-700 rounded-sm px-1 `
                : ""
            }`}
            onClick={() => updateNavPage("AI-Dashboard")}
          >
            AI-Dashboard
          </Link>
        </nav>
        <div>Hello {username}!</div>

        {/* Logout */}
        <button
          onClick={async () => {
            await logoutUser(props.setIsLoggedIn);
          }}
          className="px-5 py-2 border border-zinc-700 rounded-md hover:bg-zinc-800 transition"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
