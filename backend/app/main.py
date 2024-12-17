from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
print(f"API Key loaded: {GOOGLE_API_KEY[:5]}...")  # Only print first 5 chars for security

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",     # Next.js development
        "http://localhost:8000",     # FastAPI development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    print(f"Error configuring Gemini AI: {e}")

class FileContent(BaseModel):
    name: str
    content: str

class ChatRequest(BaseModel):
    message: str
    files: Optional[List[FileContent]] = None

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print("Received request:", request.dict())  # Debug log
        
        # Prepare the prompt with file contents if any
        prompt = request.message
        if request.files:
            print(f"Processing {len(request.files)} files")  # Debug log
            prompt += "\n\nHere are the contents of the uploaded files:\n"
            for file in request.files:
                print(f"Adding file {file.name} to prompt")  # Debug log
                prompt += f"\n--- {file.name} ---\n{file.content}\n"
        
        print("Final prompt:", prompt)  # Debug log
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        return {
            "message": response.text
        }
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

