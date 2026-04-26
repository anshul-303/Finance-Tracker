from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from database import get_db
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing only
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ai/analytics/{user_id}")
async def get_analytics(user_id: int):
    db = None
    cursor = None

    try:
        db = get_db()

        query = """
            SELECT amount, category, type, transactionDate
            FROM transactions
            WHERE userId = %s
        """

        cursor = db.cursor()       
        cursor.execute(query, (user_id,))
        rows = cursor.fetchall()

        if not rows:
            return empty_response()

        # -----------------------------
        # Convert to DataFrame
        # -----------------------------
        df = pd.DataFrame(rows)

        # Clean amount column
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0)

        # Clean date column
        df["transactionDate"] = pd.to_datetime(
            df["transactionDate"], errors="coerce"
        )

        # Remove invalid dates
        df = df.dropna(subset=["transactionDate"])

        if df.empty:
            return empty_response()

        # Clean type column
        df["type"] = (
            df["type"]
            .astype(str)
            .str.strip()
            .str.lower()
        )

        # Expense filter
        expenses = df[df["type"] == "expense"].copy()

        if expenses.empty:
            return empty_response()

        # -----------------------------
        # Basic Stats
        # -----------------------------
        avg_spend = float(expenses["amount"].mean())

        # -----------------------------
        # Category Distribution
        # -----------------------------
        cat_summary = (
            expenses.groupby("category")["amount"]
            .sum()
            .reset_index()
        )

        chart_data = cat_summary.rename(
            columns={
                "category": "name",
                "amount": "value"
            }
        ).to_dict(orient="records")

        # -----------------------------
        # Daily Spend for Prediction
        # -----------------------------
        daily = (
            expenses.groupby(
                expenses["transactionDate"].dt.date
            )["amount"]
            .sum()
            .reset_index()
        )

        daily["transactionDate"] = pd.to_datetime(
            daily["transactionDate"]
        )

        prediction = avg_spend

        if len(daily) > 1:
            daily["days"] = daily["transactionDate"].map(
                datetime.datetime.toordinal
            )

            X = daily[["days"]].values
            y = daily["amount"].values

            model = LinearRegression()
            model.fit(X, y)

            future_day = (
                datetime.datetime.now() +
                datetime.timedelta(days=30)
            ).toordinal()

            prediction = float(
                model.predict([[future_day]])[0]
            )

            prediction = max(0, prediction)

        # -----------------------------
        # Proper Z-score anomaly detection
        # -----------------------------
        anomaly_count = 0

        std_dev = expenses["amount"].std()

        if std_dev > 0:
            z_scores = np.abs(
                (expenses["amount"] - avg_spend) / std_dev
            )

            anomaly_count = int((z_scores > 2).sum())

        return {
            "status": "success",
            "insights": {
                "predictedNextMonth": round(prediction, 2),
                "anomalyCount": anomaly_count,
                "categoryDistribution": chart_data,
                "averageSpend": round(avg_spend, 2)
            }
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()


def empty_response():
    return {
        "status": "success",
        "insights": {
            "predictedNextMonth": 0,
            "anomalyCount": 0,
            "categoryDistribution": [],
            "averageSpend": 0
        }
    }