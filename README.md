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
