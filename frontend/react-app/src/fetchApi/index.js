// export async function postLoginData(
//   email,
//   password,
//   navigate,
//   setIsLoggedIn,
//   setEmail,
//   setPassword
// ) {
//   const res = await fetch("http://localhost:8000/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });
//   if (res.status === 401) {
//     const data = await res.json();
//     setEmail("");
//     setPassword("");
//     window.alert(data.message);
//   }
//   if (res.ok) {
//     const data = await res.json();
//     setIsLoggedIn(true);
//     // navigate("/add-transactions");
//     navigate("/dashboard");
//   }
// }

export async function logoutUser(setIsLoggedIn) {
  const res = await fetch("http://localhost:8000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  // console.log("User logged out!")
  setIsLoggedIn(false);
}

export async function postTransactionData(data) {
  const res = await fetch("http://localhost:8000/add-transactions", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function loadLatestTransactions() {
  const res = await fetch("http://localhost:8000/view-latest-transactions", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function getSummary() {
  const res = await fetch(
    "http://localhost:8000/add-transaction-page-account-summary",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
}

export async function getAllTransactions() {
  const res = await fetch("http://localhost:8000/get-all-transactions", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function deleteSpecificTransaction(transactionId) {
  const res = await fetch("http://localhost:8000/delete-transaction", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionId: transactionId,
    }),
  });
  return await res.json();
}

export async function editTransaction(edit, setShowModal) {
  try {
    const res = await fetch("http://localhost:8000/edit-transaction", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to edit transaction");
    }

    setShowModal(false);
    return await data;
  } catch (error) {
    console.error("Edit transaction failed:", error.message);
    throw error;
  }
}

export async function loadBarGraphData() {
  try {
    const res = await fetch("http://localhost:8000/load-income-expense-data", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to edit transaction");
    }
    return await data;
  } catch (error) {
    console.error("Edit transaction failed:", error.message);
    throw error;
  }
}

export async function getBalance() {
  try {
    const res = await fetch("http://localhost:8000/get-account-balance", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to edit transaction");
    }
    return await data;
  } catch (error) {
    console.error("Edit transaction failed:", error.message);
  }
}
