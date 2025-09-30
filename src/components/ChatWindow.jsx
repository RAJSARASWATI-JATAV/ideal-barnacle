import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToModel } from '../utils/apiClients';
import ReactMarkdown from 'react-markdown';

function Avatar({ role }) {
  return (
    <span style={{
      display: 'inline-block', width: 32, height: 32, borderRadius: '50%',
      background: role === 'user' ? '#007aff' : '#10b981', color: '#fff',
      textAlign: 'center', lineHeight: '32px', marginRight:8
    }}>
      {role === 'user' ? '🧑' : '🤖'}
    </span>
  );
}

export default function ChatWindow({ selectedModel, voiceInput, theme, systemPrompt }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (voiceInput) setInput(voiceInput);
  }, [voiceInput]);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load history from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem('chatHistory');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !file) return;
    setLoading(true);
    const userMsg = { role: 'user', content: input };
    let augmentedMessages = [...messages, { role: 'system', content: systemPrompt }, userMsg];

    // Handle file upload
    if (file) {
      userMsg.file = file.name;
      augmentedMessages.push({ role: 'user', content: `[file uploaded: ${file.name}]` });
    }

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setFile(null);

    try {
      const botReply = await sendMessageToModel(selectedModel, augmentedMessages, file);
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
      if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(botReply);
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', content: "Error: " + e.message }]);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClear = () => {
    setMessages([]);
    window.localStorage.removeItem('chatHistory');
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'chat-history.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{marginBottom:16}}>
      <div style={{
        minHeight: 220, border: '1px solid #eee', padding: 10, marginBottom: 10,
        borderRadius: 8, background: theme === 'dark' ? '#232325' : '#fff',
        maxHeight: 320, overflowY: 'auto'
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            margin: '10px 0'
          }}>
            {m.role === 'bot' && <Avatar role="bot"/>}
            <div style={{
              background: m.role === 'user' ? '#e0f2fe' : '#d1fae5',
              color: '#222', borderRadius: 18, padding: '8px 16px',
              maxWidth: '72%', wordBreak: 'break-word', boxShadow: '0 1px 4px #0001',
              fontSize: '1rem'
            }}>
              <ReactMarkdown>{m.content}</ReactMarkdown>
              {m.file && <div style={{marginTop:4}}><i>📎 {m.file}</i></div>}
            </div>
            {m.role === 'user' && <Avatar role="user"/>}
          </div>
        ))}
        {loading && <div style={{color:'#aaa'}}>🤖 Bot is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex:1, padding:8, borderRadius:8, border:'1px solid #ddd'
          }}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSend} style={{
          padding: '8px 16px', background: '#0066ff', color: '#fff',
          border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight:'bold'
        }}>Send</button>
        <button onClick={handleClear} style={{
          background:'#f87171',color:'#fff',border:'none',borderRadius:8,padding:'8px 16px'
        }}>Clear</button>
        <button onClick={handleDownload} style={{
          background:'#a3e635',color:'#222',border:'none',borderRadius:8,padding:'8px 16px'
        }}>⬇ Download</button>
      </div>
    </div>
  );
}