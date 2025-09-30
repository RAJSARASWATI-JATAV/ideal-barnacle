import React from 'react';

export default function VoiceControls({ onVoiceInput }) {
  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      onVoiceInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <button onClick={startRecognition}
      style={{
        marginBottom: 10, marginRight:10, padding: '8px 16px', background: '#0e9f6e',
        color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight:'bold'
      }}>
      🎤 Speak
    </button>
  );
}