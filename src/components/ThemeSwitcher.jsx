import React from 'react';

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div style={{textAlign:'right',marginBottom:6}}>
      <button
        onClick={()=>setTheme(theme==='light'?'dark':'light')}
        style={{
          padding:'6px 14px',borderRadius:8,background:'#444',color:'#fff',border:'none',fontWeight:'bold'
        }}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
      </button>
    </div>
  );
}