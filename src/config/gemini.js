const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;



// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';


export async function callGemini(prompt) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

const model= 'gemini-2.0-flash-001';

  const contents = [
    {
      role: 'user',
      parts: [
        { text: prompt },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}
