# PDF Question Generator

An intelligent question generation system that automatically creates various types of questions from PDF documents using FastAPI and T5 transformer model.

## Features

- PDF text extraction
- Automatic question generation in multiple formats:
  - Multiple Choice Questions (MCQ)
  - Yes/No Questions
  - Short Answer Questions
- AI-powered answer generation
- RESTful API interface
- CORS support for frontend integration

## Tech Stack

- **Backend Framework**: FastAPI
- **ML Model**: T5-base transformer
- **PDF Processing**: PyPDF2
- **ML Libraries**: 
  - PyTorch
  - Transformers (Hugging Face)

## Prerequisites

- Python 3.7+
- pip (Python package manager)

## Installation

1. Clone the repository:
```

The application will be available at `http://localhost:3000`

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Select the desired difficulty level (Easy, Medium, Hard)
3. Upload a PDF file by either:
   - Dragging and dropping onto the upload area
   - Clicking to browse files
4. Click "Generate Questions"
5. View and interact with the generated questions

## 🔌 API Endpoints

### Generate Questions

## 🔍 Troubleshooting

### Common Issues

1. **PDF Upload Fails**
   - Ensure the PDF is not password protected
   - Check if the file size is within limits
   - Verify the PDF is text-based, not scanned

2. **Backend Connection Error**
   - Verify the backend server is running on port 8000
   - Check CORS settings if using a different frontend origin
   - Ensure all dependencies are properly installed

3. **Question Generation Issues**
   - Check if the PDF text is extractable
   - Ensure the text is in a language supported by T5
   - Try with a smaller PDF if processing times out

## 🔐 Security

- File uploads are processed in memory
- No PDF files are stored permanently
- API endpoints are rate-limited
- Input validation for all requests

## 🚦 Status Codes

- `200`: Success
- `400`: Bad Request (invalid file or parameters)
- `422`: Unprocessable Entity
- `500`: Server Error

## 📊 Performance

- PDF processing: ~2-3 seconds
- Question generation: ~5-10 seconds per question
- Supports PDFs up to 10MB

## 🔜 Roadmap

- [ ] Support for more languages
- [ ] Additional question types
- [ ] User authentication
- [ ] Question history
- [ ] Export functionality
- [ ] Batch processing

## 📚 Documentation

For more detailed documentation:
1. Frontend: See `/frontend/README.md`
2. Backend: See `/backend/README.md`
3. API: See `/docs` endpoint when running the backend

## 🔄 Version History

- 1.0.0: Initial release
- 1.1.0: Added difficulty levels
- 1.2.0: Improved question generation

# Installation Guide

This guide will help you set up and run the PDF Question Generator project.

## System Requirements

### Required Software
- Python 3.7 or higher
- Node.js 14 or higher
- npm or yarn
- Git

### Hardware Requirements
- Minimum 4GB RAM (8GB recommended)
- 2GB free disk space
- Internet connection for downloading dependencies

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pdf-question-generator
```

### 2. Backend Setup

1. Create and activate a Python virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

2. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

If no requirements.txt exists, install the following packages:
```bash
pip install fastapi uvicorn PyPDF2 torch transformers pydantic python-multipart
```

3. Start the backend server:
```bash
uvicorn main:app --reload
```

The backend server will start at `http://localhost:8000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will start at `http://localhost:3000`

## Verification

### Backend Verification
1. Open your browser and navigate to `http://localhost:8000/docs`
2. You should see the FastAPI Swagger documentation
3. If you see a 404 error, check if the backend server is running

### Frontend Verification
1. Open your browser and navigate to `http://localhost:3000`
2. You should see the PDF upload interface
3. If the page doesn't load, check the terminal for error messages

## Common Installation Issues

### Backend Issues

1. **Port Already in Use**
```bash
# Change the port
uvicorn main:app --reload --port 8001
```

2. **Missing Dependencies**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

3. **Python Version Conflict**
```bash
# Verify Python version
python --version
# Should be 3.7 or higher
```

### Frontend Issues

1. **Node Modules Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

2. **Port Conflict**
```bash
# Choose a different port
PORT=3001 npm start
```

3. **CORS Issues**
- Update the backend CORS settings in `main.py` to match your frontend URL
- Default is set to `http://localhost:3000`

## Production Deployment

For production deployment:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Serve the backend with a production server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Environment Variables

Create a `.env` file in both frontend and backend directories:

### Backend (.env)
```
DEBUG=False
ALLOWED_ORIGINS=http://localhost:3000
MAX_UPLOAD_SIZE=10485760
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## Support

If you encounter any issues during installation:
1. Check the troubleshooting section in README.md
2. Review the console logs for error messages
3. Ensure all system requirements are met
4. Verify network connectivity for package downloads

## Updates

To update the project:

```bash
git pull origin main
cd backend
pip install -r requirements.txt
cd ../frontend
npm install
```
