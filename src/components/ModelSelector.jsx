import React from 'react';
const models = ['OpenAI GPT-4', 'Claude 3', 'Gemini Pro', 'Grok', 'Wikipedia', 'Wolfram Alpha', 'Google Search'];
export default function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <select
      value={selectedModel}
      onChange={e => setSelectedModel(e.target.value)}
      style={{
        marginBottom: 10, padding: 10, borderRadius: 8, border: '1px solid #ccc',
        fontWeight: 'bold', fontSize:'1rem'
      }}
    >
      {models.map(m => <option key={m} value={m}>{m}</option>)}
    </select>
  );
}