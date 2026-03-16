import { useState, createContext } from "react";

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    try {
      const res = await fetch("http://localhost:8000/user-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
      }
    } catch (error) {
      console.log("Error detected : ", error);
    }
  };

  return (
      <UserDataContext.Provider value={{ username, setUsername, getUsername }}>
        {children}
      </UserDataContext.Provider>
  );
}
