export function convertDate(date) {
  const now = new Date();

  // Extract Y-M-D from user date (do NOT use Date object for date)
  const [year, month, day] = date.split("-");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function addTransactionToDB(
  pool,
  userId,
  type,
  amount,
  category,
  description,
  transactionDate
) {
  //When expense transaction to DB, need to check if enough balance in there. As balance cannot go below Rs. 0.
  await pool.query(
    `INSERT INTO transactions (userId, type, amount, category, description, transactionDate )
      VALUES (?, ?, ?, ?, ?, ?);`,
    [userId, type, amount, category, description, transactionDate]
  );
  if (type === "Income") {
    await pool.query(
      `UPDATE  accounts set balance=balance+?, income=income+? where user=?;`,
      [amount, amount, userId]
    );
  } else if (type === "Expense") {
    await pool.query(
      `UPDATE  accounts set balance=balance-?, expense=expense+? where user=?;`,
      [amount, amount, userId]
    );
  }

  const [rows] = await pool.query("SELECT * FROM transactions;");
}

export async function getLatestTransactions(pool, userId) {
  const [rows] = await pool.query(
    `
    SELECT
      type,
      amount,
      description,
      DATE_FORMAT(transactionDate, '%d %b, %Y') AS transactionDate
    FROM transactions
    WHERE userId = ?
    ORDER BY createdAt DESC
    LIMIT 5
    `,
    [userId]
  );

  return rows;
}

export async function deleteTransaction(pool, userId, transactionId) {
  const [row] = await pool.query(
    "SELECT * FROM transactions WHERE transactionId=? AND userId=?;",
    [transactionId, userId]
  );
  if (row.length === 1) {
    const transaction = row[0];
    const type = transaction.type;
    const amount = transaction.amount;
    if (type === "Expense")
      await pool.query(
        "UPDATE accounts set balance = balance + ? ,expense= expense - ? where user=?;",
        [amount, amount, userId]
      );
    else if (type === "Income")
      await pool.query(
        "UPDATE accounts set balance = balance - ? ,income= income - ? where user=?;",
        [amount, amount, userId]
      );
    await pool.query(
      "DELETE FROM transactions WHERE transactionId=? AND userId=?;",
      [transactionId, userId]
    );
    const [rows] = await pool.query(
      "SELECT * FROM transactions WHERE userId=? ORDER BY createdAt DESC;",
      [userId]
    );
    return rows;
  }
  return [];
}

export async function editTransactionToDB(
  pool,
  userId,
  transactionId,
  type,
  category,
  amount,
  description,
  transactionDate
) {
  try {
    const dateOfTrans = convertDate(transactionDate);
    const [row] = await pool.query(
      "SELECT type, amount FROM transactions WHERE transactionId=?;",
      [transactionId]
    );
    if (row.length === 1) {
      const transaction = row[0];
      const tempType = transaction.type;
      const tempAmount = transaction.amount;
      if (tempType === "Expense")
        await pool.query(
          "UPDATE accounts SET balance = balance + ? ,expense= expense - ? WHERE user=?;",
          [tempAmount, tempAmount, userId]
        );
      else if (tempType === "Income")
        await pool.query(
          "UPDATE accounts SET balance = balance - ? ,income= income - ? WHERE user=?;",
          [tempAmount, tempAmount, userId]
        );
      //Above we changed the account if transaction didn't happen
      //Now below we calculate and update the accounts based on edited transaction info. Also we update the transaction DB with new edited info.

      //Updating accounts
      if (type === "Expense")
        await pool.query(
          "UPDATE accounts SET balance = balance - ? ,expense= expense + ? WHERE user=?;",
          [amount, amount, userId]
        );
      else if (type === "Income")
        await pool.query(
          "UPDATE accounts SET balance = balance + ? ,income= income + ? WHERE user=?;",
          [amount, amount, userId]
        );

      //Now we update the transactions table
      await pool.query(
        "update transactions SET type=? , description=? , category=?, amount=?, transactionDate=? WHERE transactionId=?; ",
        [type, description, category, amount, dateOfTrans, transactionId]
      );
    }
  } catch (error) {
    throw new Error("Error detected", error);
  }
}

export async function loadIncomeExpenseData(pool, userId) {
  try {
    const query = `
    SELECT
      DATE_FORMAT(transactionDate, '%Y-%m') AS month,
      type,
      SUM(amount) AS total
    FROM transactions
    WHERE
      userId = ?
      AND transactionDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
    GROUP BY month, type
    ORDER BY month
`;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error detected", error);
  }
}

export async function loadExpenseByCategory(pool, userId){
  try {
    const query = `
    select category, sum(amount) as total from transactions  where userId=? and type="expense"  group by category;
`;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error detected", error);
  }
}


export async function loadIncomeByCategory(pool, userId) {
  try {
    const query = `
    select category, sum(amount) as total from transactions  where userId=? and type="income"  group by category;
`;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error detected", error);
  }
}
