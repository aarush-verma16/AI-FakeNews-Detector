import React from 'react';

const ResultSection = ({ result }) => {
  const parseResult = (result) => {
    let label, confidence;
    
    if (typeof result === 'string') {
      label = result;
      confidence = null;
    } else if (result.prediction) {
      label = result.prediction;
      confidence = result.confidence;
    } else if (result.label) {
      label = result.label;
      confidence = result.confidence || result.probability;
    } else {
      label = result.result || 'Unknown';
      confidence = result.confidence;
    }
    
    // Normalize label
    label = label.toString().toLowerCase();
    const isReal = label.includes('real') || label.includes('true') || label === '1';
    const isFake = label.includes('fake') || label.includes('false') || label === '0';
    
    return {
      isReal,
      isFake,
      displayLabel: isReal ? '✅ REAL' : isFake ? '❌ FAKE' : `📊 ${label.toUpperCase()}`,
      confidence,
      labelClass: isReal ? 'real' : isFake ? 'fake' : ''
    };
  };

  const { displayLabel, confidence, labelClass } = parseResult(result);

  return (
    <div className="result-section">
      <div className="result-card">
        <div className="result-header">
          <h3>Analysis Result</h3>
        </div>
        <div className="result-content">
          <div className={`result-label ${labelClass}`}>
            {displayLabel}
          </div>
          {confidence !== null && confidence !== undefined && (
            <div className="result-confidence">
              Confidence: {Math.round(confidence * 100)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
