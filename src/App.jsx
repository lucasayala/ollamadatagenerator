import React, { useState } from 'react';
    import './index.css';

    function App() {
      const [model, setModel] = useState('');
      const [recordCount, setRecordCount] = useState(10);
      const [outputFormat, setOutputFormat] = useState('json');
      const [keyword, setKeyword] = useState('');
      const [loading, setLoading] = useState(false);
      const [progress, setProgress] = useState(0);
      const [data, setData] = useState(null);

      const handleGenerateData = async () => {
        setLoading(true);
        setProgress(0);

        // Simulate API call to Ollama
        try {
          const response = await fetch('/api/generate-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ model, recordCount, outputFormat, keyword })
          });

          if (!response.ok) {
            throw new Error('Failed to generate data');
          }

          const result = await response.json();
          setData(result.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setProgress(100);
        }
      };

      return (
        <div className="app">
          <h1>Ollama Synthetic Data Generator</h1>
          <div className="form-group">
            <label htmlFor="model">Select Model:</label>
            <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">--Select a model--</option>
              <option value="model1">Model 1</option>
              <option value="model2">Model 2</option>
              {/* Add more models as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="recordCount">Number of Records:</label>
            <input
              type="number"
              id="recordCount"
              value={recordCount}
              onChange={(e) => setRecordCount(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="outputFormat">Output Format:</label>
            <select id="outputFormat" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              {/* Add more formats as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="keyword">Keyword/Phrase (optional):</label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button onClick={handleGenerateData} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Data'}
          </button>
          {loading && (
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          {data && (
            <div className="data-actions">
              <h2>Generated Data Sample:</h2>
              <pre>{JSON.stringify(data.slice(0, 5), null, 2)}</pre>
              <button onClick={() => console.log('Save file')}>Save File</button>
              <button onClick={() => console.log('Open in VS Code')}>Open in VS Code</button>
            </div>
          )}
        </div>
      );
    }

    export default App;
