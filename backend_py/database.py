import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    try:
        # PyMySQL is much more stable on Windows/Python 3.12
        connection = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="root123", # Hardcode for this test
            database="finance_tracker",
            cursorclass=pymysql.cursors.DictCursor, # This replaces dictionary=True
            connect_timeout=3
        )
        return connection
    except Exception as err:
        print(f"❌ DATABASE ERROR: {err}")
        return None