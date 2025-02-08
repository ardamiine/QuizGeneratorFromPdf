import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const generateQuestions = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('difficulty', difficulty);

      const response = await fetch('http://localhost:8000/generate-questions/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="question-options">
            {question.options.map((option, idx) => (
              <label key={idx} className="option-label">
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={option}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'yesno':
        return (
          <div className="question-options">
            <label className="option-label">
              <input type="radio" name={`question-${question.text}`} value="Yes" />
              <span className="option-text">Yes</span>
            </label>
            <label className="option-label">
              <input type="radio" name={`question-${question.text}`} value="No" />
              <span className="option-text">No</span>
            </label>
          </div>
        );
      case 'short':
        return (
          <div className="short-answer">
            <input
              type="text"
              placeholder="Your answer..."
              className="answer-input"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>PDF Question Generator</h1>
          <div className="difficulty-wrapper">
            <label>Difficulty:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="difficulty-select"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </nav>
      
      <main className="app-main">
        <div className="container">
          <section className="upload-container">
            <div className="upload-box">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                id="file-input"
              />
              <label htmlFor="file-input" className="upload-area">
                <i className="upload-icon">📄</i>
                <span className="upload-text">
                  {selectedFile ? selectedFile.name : 'Drop your PDF here or click to browse'}
                </span>
              </label>
              <button 
                onClick={generateQuestions}
                disabled={!selectedFile || isLoading}
                className="generate-button"
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Generate Questions'
                )}
              </button>
            </div>
          </section>

          <section className="questions-container">
            {questions.length > 0 ? (
              <div className="questions-grid">
                {questions.map((question, index) => (
                  <div key={index} className="question-card">
                    <div className="question-type">
                      {question.type === 'mcq' ? 'Multiple Choice' :
                       question.type === 'yesno' ? 'Yes/No' : 'Short Answer'}
                    </div>
                    <div className="question-content">
                      <p className="question-text">{question.text}</p>
                      {renderQuestionContent(question)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="empty-icon">❓</i>
                <h3>No Questions Generated Yet</h3>
                <p>Upload a PDF and click generate to see your questions here</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
