import React, { useState } from 'react';
import axios from 'axios';

export default function ExternalServices() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);
  const [wiki, setWiki] = useState(null);

  const fetchWeather = async () => {
    const resp = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true');
    setWeather(resp.data.current_weather);
  };

  const fetchNews = async () => {
    const resp = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=demo');
    setNews(resp.data.articles?.slice(0,3));
  };

  const fetchWiki = async () => {
    const resp = await axios.get('https://en.wikipedia.org/api/rest_v1/page/summary/OpenAI');
    setWiki(resp.data);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={fetchWeather}
        style={{marginRight:10, padding:'7px 15px', borderRadius:6, background:'#3b82f6', color:'#fff', border:'none'}}>Get Delhi Weather</button>
      <button onClick={fetchNews} style={{marginRight:10, padding:'7px 15px', borderRadius:6, background:'#f59e42', color:'#fff', border:'none'}}>Get India News</button>
      <button onClick={fetchWiki} style={{padding:'7px 15px', borderRadius:6, background:'#6366f1', color:'#fff', border:'none'}}>OpenAI Wiki</button>
      {weather && (
        <div style={{marginTop:8}}>
          <b>Delhi Weather:</b> {weather.temperature}°C, Winds: {weather.windspeed} km/h
        </div>
      )}
      {news && (
        <div style={{marginTop:8}}>
          <b>Latest News:</b>
          <ul>
            {news.map((n,i) => (
              <li key={i}><a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a></li>
            ))}
          </ul>
        </div>
      )}
      {wiki && (
        <div style={{marginTop:8}}>
          <b>OpenAI Wikipedia:</b> {wiki.extract}
          <div><a href={wiki.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Read more</a></div>
        </div>
      )}
    </div>
  );
}