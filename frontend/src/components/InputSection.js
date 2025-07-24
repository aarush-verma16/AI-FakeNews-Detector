import React, { useState } from 'react';

const InputSection = ({ onAnalyze, loading, onClearError, onClearResult }) => {
  const [textContent, setTextContent] = useState('');

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    onClearError();
    onClearResult();
  };

  const handleAnalyze = async () => {
    const content = textContent.trim();
    if (!content) {
      alert('Please enter some text to analyze.');
      return;
    }

    await onAnalyze(content, 'text');
  };

  const hasValidInput = () => {
    return textContent.trim().length > 0;
  };

  return (
    <div className="input-section">
      <div className="input-header">
        <h3>Enter News Article Text</h3>
        <p>Paste the news article you want to analyze below:</p>
      </div>

      <textarea
        className="article-text"
        placeholder="Paste your news article here..."
        rows="10"
        value={textContent}
        onChange={handleTextChange}
      />

      <button 
        className="analyze-button"
        onClick={handleAnalyze}
        disabled={!hasValidInput() || loading}
      >
        <span className="button-text">
          {loading ? 'Analyzing...' : 'Analyze Article'}
        </span>
        {loading && <div className="spinner"></div>}
      </button>
    </div>
  );
};

export default InputSection;
