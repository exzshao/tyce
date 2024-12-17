from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables and setup
load_dotenv()
app = FastAPI()

# Setup AI model
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

# Define data structures
class FileContent(BaseModel):
    name: str
    content: str

class ChatRequest(BaseModel):
    message: str
    files: Optional[List[FileContent]] = None

# API endpoints
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Combine message with file contents if any files were uploaded
        prompt = request.message
        if request.files:
            prompt += "\n\nContext from files:\n"
            for file in request.files:
                prompt += f"\n{file.name}:\n{file.content}\n"
        
        # Get AI response
        response = model.generate_content(prompt)
        return {"message": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

