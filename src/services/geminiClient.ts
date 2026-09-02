/**
 * Google Gemini API Client for BIS Compliance Assistant
 * Connects to Gemini models when VITE_GEMINI_API_KEY is configured.
 */

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
}

export async function queryGemini(prompt: string, systemContext?: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Fallback to embedded RAG engine
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemContext || 
                  'You are the official BIS Intelligent Compliance Assistant for Smart India Hackathon 2026. ' +
                  'Answer strictly regarding Bureau of Indian Standards (BIS), Indian Standards (IS), mandatory QCOs, certification schemes (ISI, CRS, FMCS, Hallmarking), and testing laboratories. ' +
                  'Cite specific IS numbers and clauses wherever applicable.'
              }
            ]
          },
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      console.warn('Gemini API call failed, falling back to embedded RAG:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.warn('Gemini API fetch error, switching to local RAG knowledge base:', error);
    return null;
  }
}
