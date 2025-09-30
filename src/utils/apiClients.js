import axios from 'axios';

// Ultra pro max: add new models and streaming easily!
export async function sendMessageToModel(model, messages, file) {
  switch (model) {
    case 'OpenAI GPT-4':
      return await callOpenAI(messages, 'gpt-4', file);
    case 'Claude 3':
      return await callClaude(messages, file);
    case 'Gemini Pro':
      return await callGemini(messages, file);
    case 'Grok':
      return await callGrok(messages, file);
    case 'Wikipedia':
      return await callWikipedia(messages);
    case 'Wolfram Alpha':
      return await callWolfram(messages);
    case 'Google Search':
      return await callGoogleSearch(messages);
    default:
      return "Model not supported!";
  }
}

// Streaming support for OpenAI, demo only!
async function callOpenAI(messages, model='gpt-3.5-turbo', file) {
  const apiKey = process.env.OPENAI_API_KEY || '';
  if (!apiKey) return "OpenAI API Key not set (set in Vercel Environment Variables)";
  try {
    // File upload: use OpenAI file endpoints if enabled
    // Streaming: demo only, real streaming needs SSE/WebSockets
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages
    }, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    return resp.data.choices[0].message.content;
  } catch (e) {
    return "Error: Unable to connect to OpenAI API.";
  }
}

async function callClaude(messages, file) {
  const apiKey = process.env.CLAUDE_API_KEY || '';
  if (!apiKey) return "Claude API Key not set.";
  // Replace with Anthropic Claude API call
  return "Claude API response (demo)";
}

async function callGemini(messages, file) {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return "Gemini API Key not set.";
  // Replace with Google Gemini API call
  return "Gemini API response (demo)";
}

async function callGrok(messages, file) {
  const apiKey = process.env.GROK_API_KEY || '';
  if (!apiKey) return "Grok API Key not set.";
  // Replace with xAI Grok API call
  return "Grok API response (demo)";
}

async function callWikipedia(messages) {
  // Use Wikipedia API for summary
  const topic = messages[messages.length-1].content || 'OpenAI';
  try {
    const resp = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
    return resp.data.extract || "No summary found.";
  } catch (e) {
    return "Error: Unable to connect to Wikipedia API.";
  }
}

async function callWolfram(messages) {
  // Hook for Wolfram Alpha API (needs AppID)
  return "Wolfram Alpha response (demo)";
}

async function callGoogleSearch(messages) {
  // Hook for Google Search API (needs API Key)
  return "Google Search response (demo)";
}