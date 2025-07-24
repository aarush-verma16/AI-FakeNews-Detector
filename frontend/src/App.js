import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import ErrorSection from './components/ErrorSection';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (content, type) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          type: type
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Backend service not available. Please make sure the server is running.');
        } else if (response.status >= 500) {
          throw new Error('Server error occurred. Please try again later.');
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred while analyzing the article.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearResult = () => setResult(null);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <main className="main">
          <InputSection 
            onAnalyze={handleAnalyze}
            loading={loading}
            onClearError={clearError}
            onClearResult={clearResult}
          />
          {result && <ResultSection result={result} />}
          {error && <ErrorSection error={error} onClose={clearError} />}
        </main>
      </div>
    </div>
  );
}

export default App;
