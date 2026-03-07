
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize GoogleGenAI with process.env.API_KEY directly within the named parameters object.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const getGeminiResponse = async (prompt: string, contactName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are ${contactName}, a futuristic, tech-savvy character in a neon-drenched cyberpunk world called ZENERGY. 
        Your responses should be cool, casual, and brief, like a real chat message. 
        Use emojis sparingly. Keep it under 2 sentences. 
        Context: You are talking to your friend Alex.`,
        temperature: 0.9,
      },
    });
    // Correctly extract text using the .text property (not a method call).
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of a glitch in the mainframe. Talk soon!";
  }
};


export async function generateReelVibe(description: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given this short social media post description: "${description}", generate a catchy two-word "Vibe" name for it (e.g., "Neon Dream", "Cyber Chill"). Return only the two words.`,
    });
    return response.text?.trim() || "New Vibe";
  } catch (error) {
    console.error("Gemini Vibe Error:", error);
    return "Unknown Vibe";
  }
}

export async function generateAIEnhancedHashtags(description: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract the best 4 relevant cyberpunk-themed hashtags from this description: "${description}". Return them as a comma-separated list without the # symbols.`,
    });
    const text = response.text || "";
    return text.split(',').map(s => s.trim().replace(/^#/, ''));
  } catch (error) {
    console.error("Gemini Hashtag Error:", error);
    return ["cyber", "vibe", "zenergy"];
  }
}

export const getVibeSuggestions = async (query: string) => {
  if (!process.env.API_KEY || !query) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is searching for content with the vibe: "${query}". Provide 5 related short keywords or moods that match this vibe.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as string[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};