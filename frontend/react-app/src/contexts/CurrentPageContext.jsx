import { useState, createContext } from "react";

export const CurrentPageContext = createContext();

export function CurrentPageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
}
