from fastapi import FastAPI
from database import get_db
import json
app = FastAPI()

@app.get("/")
def sayHello():
    print("Step 1: Route hit!")
    db = get_db()
    
    if db:
        print("Step 2: Database connected!")
        try:
            cursor = db.cursor()
            cursor.execute("SELECT * FROM users;")
            result = cursor.fetchall()
            print("Step 3: Data fetched:")
            print(json.dumps(result, indent=4, default=str))
            
            cursor.close()
            db.close()
            return {"status": "success", "data": result}
        except Exception as e:
            print(f"Error during query: {e}")
            return {"status": "error", "message": str(e)}
    else :
        print("The DB connection didn't get formed!")
    
    print("Step 2: Database connection FAILED!")
    return {"status": "fail", "message": "Could not connect to DB"}