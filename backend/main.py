from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import random
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load T5 model and tokenizer
model_name = "t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

class Question(BaseModel):
    type: str
    text: str
    options: Optional[List[str]] = None
    correct_answer: str

def extract_text_from_pdf(pdf_file: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def generate_questions(text: str, difficulty: str, num_questions: int = 5) -> List[Question]:
    questions = []
    
    # Prepare text for T5
    text = text[:1024]  # Limit text length for T5
    
    # Different prompts based on question types
    question_types = {
        "mcq": "generate multiple choice question:",
        "yesno": "generate yes/no question:",
        "short": "generate short answer question:"
    }
    
    for _ in range(num_questions):
        # Randomly select question type
        q_type = random.choice(list(question_types.keys()))
        
        # Prepare input for T5
        input_text = f"{question_types[q_type]} {text}"
        inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
        
        # Generate question
        outputs = model.generate(
            inputs, 
            max_length=64,
            num_beams=4,
            temperature=0.7,
            top_k=50,
            top_p=0.95,
        )
        
        question_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Generate answer
        answer_input = f"answer: {question_text} context: {text}"
        answer_inputs = tokenizer.encode(answer_input, return_tensors="pt", max_length=512, truncation=True)
        answer_outputs = model.generate(
            answer_inputs,
            max_length=32,
            num_beams=4,
        )
        answer = tokenizer.decode(answer_outputs[0], skip_special_tokens=True)
        
        # Create question object based on type
        if q_type == "mcq":
            options = [answer]  # Correct answer
            # Generate distractors
            for _ in range(3):
                distractor_input = f"generate wrong answer: {question_text}"
                distractor_inputs = tokenizer.encode(distractor_input, return_tensors="pt")
                distractor_outputs = model.generate(distractor_inputs, max_length=32)
                distractor = tokenizer.decode(distractor_outputs[0], skip_special_tokens=True)
                options.append(distractor)
            random.shuffle(options)
            
            questions.append(Question(
                type="mcq",
                text=question_text,
                options=options,
                correct_answer=answer
            ))
        elif q_type == "yesno":
            questions.append(Question(
                type="yesno",
                text=question_text,
                correct_answer=answer
            ))
        else:
            questions.append(Question(
                type="short",
                text=question_text,
                correct_answer=answer
            ))
    
    return questions

@app.post("/generate-questions/")
async def generate_questions_endpoint(
    file: UploadFile = File(...),
    difficulty: str = "medium"
):
    # Read and extract text from PDF
    pdf_content = await file.read()
    text = extract_text_from_pdf(pdf_content)
    
    # Generate questions
    questions = generate_questions(text, difficulty)
    
    return {"questions": questions} 