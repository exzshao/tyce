from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
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
    allow_origins=["http://localhost:3000"],  # Your React app's URL
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

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat")
async def chat(
    message: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    try:
        # Initialize content with the message
        content = message

        # If file is provided, process it
        if file:
            if not file.filename.endswith('.txt'):
                raise HTTPException(
                    status_code=400,
                    detail="Only .txt files are supported"
                )
            
            # Read and decode file content
            file_content = await file.read()
            try:
                file_text = file_content.decode('utf-8')
            except UnicodeDecodeError:
                try:
                    file_text = file_content.decode('latin-1')
                except UnicodeDecodeError:
                    raise HTTPException(
                        status_code=400,
                        detail="Unable to decode file. Please ensure it's a valid text file."
                    )
            
            # Combine message with file content
            content = f"{message}\n\nFile Content:\n{file_text}"

        # Generate response using Gemini
        response = model.generate_content(content)
        
        return {
            "message": message,
            "file_name": file.filename if file else None,
            "ai_response": response.text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
