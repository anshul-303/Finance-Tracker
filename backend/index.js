import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./auth.js";
import {
  convertDate,
  addTransactionToDB,
  getLatestTransactions,
  deleteTransaction,
  editTransactionToDB,
  loadIncomeExpenseData,
  loadExpenseByCategory,
  loadIncomeByCategory,
} from "./utilities.js";

dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Basic POST route for Signup page
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "insert into users (name, email, password) values (?, ?, ?);",
      [name, email, hashedPassword]
    );
    const [row] = await pool.query("SELECT userId FROM users where email=?;", [
      email,
    ]);
    console.log(row[0].userId);
    //Creating a new account with default values 0 by adding new accounts row
    await pool.query("INSERT into accounts (user) VALUES (?);", [
      row[0].userId,
    ]);
    res.status(200).json({ message: "Sign up successful!" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
});

//Basic POST route for Login page
app.post("/login", async (req, res) => {
  // Cases covered:
  //Email not found , email found but invalid password, server error

  try {
    const { email, password } = req.body;
    const [foundUser] = await pool.query("select *from users where email=?;", [
      email,
    ]);
    if (foundUser.length === 0)
      res.status(404).json({ message: "User not found!" }); //User not found case where email is not found in DB

    const match = await bcrypt.compare(password, foundUser[0].password);

    if (match) {
      //Found a user with matching credentials
      const token = jwt.sign(
        {
          userId: foundUser[0].userId,
        },
        process.env.SECRET_KEY,
        { expiresIn: "15h" }
      );
      res.cookie("token", token, {
        maxAge: 3600000 * 15,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      // res.status(200).json({ token });
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Incorrect password!" }); //User found case but password is incorrect.
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    // return res.status(401).json({ authenticated: false });
    res.json({ authenticated: false });
  } else {
    return res.status(200).json({ authenticated: true });
  }
});

//POST route for logging out the user
app.post("/logout", authMiddleware, async (req, res) => {
  // const userId = req.userId;
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logged the user out!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/user-data", authMiddleware, async (req, res) => {
  try {
    const [userRow] = await pool.query("SELECT * FROM users WHERE userId=?;", [
      req.userId,
    ]);
    res.status(200).json({
      message: "Fetched the user data correctly!",
      userId: userRow[0].userid,
      username: userRow[0].name,
      creationDate: userRow[0].creationDate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/add-transactions", authMiddleware, async (req, res) => {
  try {
    const { type, amount, description, category, transactionDate } = req.body;
    await addTransactionToDB(
      pool,
      req.userId,
      type,
      amount,
      category,
      description,
      transactionDate
    ); //Also updates the accounts table
    const rows = await getLatestTransactions(pool, req.userId);
    res
      .status(200)
      .json({ message: "The data is received properly!", rows: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/view-latest-transactions", authMiddleware, async (req, res) => {
  try {
    const rows = await getLatestTransactions(pool, req.userId);
    res
      .status(200)
      .json({ message: "The data is received properly!", rows: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get(
  "/add-transaction-page-account-summary",
  authMiddleware,
  async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM transactions where userId=?;",
        [req.userId]
      );
      const [account] = await pool.query(
        " SELECT * FROM accounts where user=?;",
        [req.userId]
      );
      const data = {
        balance: account[0].balance,
        income: account[0].income,
        expense: account[0].expense,
        totalTransactions: rows.length,
      };
      res
        .status(200)
        .json({ message: "The data is received properly!", data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

app.get("/get-all-transactions", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM transactions where userId=? ORDER BY createdAt DESC;",
      [req.userId]
    );
    res.status(200).json({ message: "Data is received", data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/delete-transaction", authMiddleware, async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transactions = await deleteTransaction(
      pool,
      req.userId,
      transactionId
    );
    res
      .status(200)
      .json({ message: "Data is deleted", transactions: transactions });
  } catch (error) {
    console.log("Delete error : ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.put("/edit-transaction", authMiddleware, async (req, res) => {
  try {
    const {
      transactionId,
      type,
      category,
      amount,
      description,
      transactionDate,
    } = req.body;
    const result = await editTransactionToDB(
      pool,
      req.userId,
      transactionId,
      type,
      category,
      amount,
      description,
      transactionDate
    );
    res.status(200).json({ message: "Edit Sucessful!" });
  } catch (error) {
    console.log("Error detected!", error);
    res
      .status(500)
      .json({ message: "Internal server error! Edit could not happen!" });
  }
});

app.get("/load-income-expense-data", authMiddleware, async (req, res) => {
  //This was for fetch req to get the data for bar graph on the dashboard!
  try {
    const userId = req.userId;
    const rows = await loadIncomeExpenseData(pool, userId);
    // console.log(rows);
    res.status(200).json({
      mesage: "The income and expense data is fetched successfully!",
      rows,
    });
  } catch (error) {
    console.log("Error detected!", error);
    res
      .status(500)
      .json({ message: "Internal server error! Edit could not happen!" });
  }
});

app.get("/load-expense-by-category", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const rows = await loadExpenseByCategory(pool, userId);
    res.status(200).json({
      mesage: "Expense by category data has been fetched succesfully!",
      rows,
    });
  } catch (error) {
    console.log("Error detected!", error);
    res.status(500).json({
      message: "Internal server error! Could not load expense by Category!",
    });
  }
});

app.get("/load-income-by-category", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const rows = await loadIncomeByCategory(pool, userId);
    res.status(200).json({
      mesage: "Income by category data has been fetched succesfully!",
      rows,
    });
  } catch (error) {
    console.log("Error detected!", error);
    res.status(500).json({
      message: "Internal server error! Could not load income by Category!",
    });
  }
});

app.get("/get-account-balance", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT balance FROM accounts WHERE user=?;", [
      req.userId,
    ]);
    res.status(200).json({ message: "Successful balance fetch!", balance:rows[0].balance });
  } catch (error) {
    console.log("Error detected :", error);
  }
});

//Newly added
app.get("/api/ai-insights", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const pythonResponse = await fetch(`http://localhost:8001/api/ai/analytics/${userId}`);
    const aiData = await pythonResponse.json();

    // ADD THIS LOG HERE
    console.log("Full AI Data from Python:", aiData);

    res.status(200).json(aiData);
  } catch (error) {
    console.error("AI Bridge Error:", error);
    res.status(500).json({ status: "error", message: "AI Backend unreachable" });
  }
});

app.listen(process.env.PORT);
