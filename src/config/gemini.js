import { GoogleGenAI } from '@google/genai';
import { useEffect } from 'react';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;




export async function callGemini(prompt) {
  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.0-flash-lite';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}
