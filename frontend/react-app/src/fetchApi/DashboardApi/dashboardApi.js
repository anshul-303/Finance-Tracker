export async function loadExpenseByCategory() {
  try {
    const res = await fetch("http://localhost:8000/load-expense-by-category", {
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

export async function loadIncomeByCategory() {
  try {
    const res = await fetch("http://localhost:8000/load-income-by-category", {
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
