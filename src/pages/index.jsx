import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ModelSelector from '../components/ModelSelector';
import VoiceControls from '../components/VoiceControls';
import ExternalServices from '../components/ExternalServices';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Auth from '../components/Auth';
import AboutDeveloper from '../components/AboutDeveloper';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('OpenAI GPT-4');
  const [voiceInput, setVoiceInput] = useState('');
  const [theme, setTheme] = useState('light');
  const [systemPrompt, setSystemPrompt] = useState('You are an ultra pro max helpful assistant.');

  return (
    <div className={theme} style={{
      maxWidth: 700, margin: 'auto', padding: 20,
      fontFamily: 'Inter, Arial, sans-serif', background: theme === 'dark' ? '#18181b' : '#f8fafc', borderRadius: 10
    }}>
      <Auth />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <h1 style={{textAlign:'center'}}>🦾 Ultra Pro Max AI Chatbot</h1>
      <div style={{marginBottom: 8}}>
        <label><b>System Prompt:</b></label>
        <input value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)}
          style={{width:'100%',padding:8,marginTop:4,borderRadius:8,border:'1px solid #ccc'}} />
      </div>
      <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <VoiceControls onVoiceInput={setVoiceInput} />
      <ChatWindow selectedModel={selectedModel} voiceInput={voiceInput} theme={theme} systemPrompt={systemPrompt} />
      <ExternalServices />
      <AboutDeveloper />
      <footer style={{
        marginTop: 32, fontSize: 12, color: theme === 'dark' ? '#ccc' : '#888', textAlign: 'center'
      }}>
        Ultra Pro Max AI Chatbot &copy; 2025 Created and Developed by RAJSARASWATI JATAV
      </footer>
    </div>
  );
}