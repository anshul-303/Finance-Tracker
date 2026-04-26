import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AddTransactions from "./components/AddTransactions.jsx";
import ViewTransactions from "./components/ViewTransactions.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { UserDataProvider } from "./contexts/userDataContext.jsx";
import { useEffect } from "react";
import AiDashboard from "./components/AiDashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8000/api/check-auth", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(data.authenticated);
      setIsLoading(false); // 2. Set loading to false when done
    };
    checkAuth();
  }, []);

  if (isLoading) return null;

  // if (isLoggedIn) console.log("We are logged in!");
  return (
    <>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/add-transactions"
            element={
              isLoggedIn ? (
                <AddTransactions setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/view-transactions"
            element={
              isLoggedIn ? (
                <ViewTransactions setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/ai-dash"
            element={
              isLoggedIn ? (
                <AiDashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </UserDataProvider>
    </>
  );
}

export default App;
