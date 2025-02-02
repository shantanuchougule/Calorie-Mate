from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import google.generativeai as genai
import pandas as pd
import re
from dotenv import load_dotenv
from fastapi.responses import FileResponse
import os

# Load API Key
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

# Allow CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route to prevent 404 errors
@app.get("/")
async def root():
    return {"message": "Welcome to the Calorie Tracker API!"}

# Pydantic model for input validation
class FoodRequest(BaseModel):
    food_items: List[str]

def clean_numeric(value):
    """Cleans and converts numeric values, removing unwanted characters."""
    value = value.strip().replace(" kcal", "").replace(" g", "")
    value = re.sub(r"[^\d.]", "", value)
    return float(value) if value else 0.0

@app.post("/get_macros/")
async def get_macronutrients(request: FoodRequest):
    """Fetches macronutrient breakdown for given food items using Google Gemini API."""
    try:
        food_items = request.food_items
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        You are a nutrition expert. Provide the macronutrient breakdown for the following food items in a structured table:

        {', '.join(food_items)}

        The table should include:
        | Food Item | Quantity | Calories (kcal) | Carbs (g) | Protein (g) | Fats (g) |
        """
        response = model.generate_content(prompt)

        # Process response
        table_lines = [line.strip() for line in response.text.split("\n") if "|" in line and not re.search(r'-{3,}', line)]
        clean_data = [line.split('|')[1:-1] for line in table_lines]
        clean_data = [[cell.strip() for cell in row] for row in clean_data]

        if "Calories (kcal)" in clean_data[0]:
            clean_data.pop(0)

        df = pd.DataFrame(clean_data, columns=["Food Item", "Quantity", "Calories", "Carbs", "Protein", "Fats"])
        numeric_cols = ["Calories", "Carbs", "Protein", "Fats"]
        for col in numeric_cols:
            df[col] = df[col].apply(clean_numeric)

        total_values = df[numeric_cols].sum()
        total_row = {"Food Item": "Total", "Quantity": "-", "Calories": total_values["Calories"],
                     "Carbs": total_values["Carbs"], "Protein": total_values["Protein"], "Fats": total_values["Fats"]}
        df = pd.concat([df, pd.DataFrame([total_row])], ignore_index=True)


        # Save CSV
        df.to_csv("macro_nutrients.csv", index=False)

        return {"data": df.to_dict(orient="records")}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download_csv/")
async def download_csv():
    """Serves the generated CSV file for download."""
    file_path = "macro_nutrients.csv"
    
    # Ensure the file exists before returning it
    if os.path.exists(file_path):
        return FileResponse(file_path, filename="macronutrients.csv", media_type="text/csv")
    
    raise HTTPException(status_code=404, detail="CSV file not found")