
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Global chat session instance
let chatSession: Chat | null = null;

/**
 * Initializes the Gemini Chat session.
 * Uses 'gemini-3-pro-preview' which is suitable for complex text reasoning and document generation.
 */
export const initializeGeminiChat = (apiKey: string) => {
  // Always use a named parameter for the API key initialization
  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
      // Gemini 3 models support thinkingBudget for deeper reasoning in complex tasks
      thinkingConfig: { thinkingBudget: 32768 } 
    },
  });
  return chatSession;
};

/**
 * Sends a message string to the active Gemini chat session and processes the streaming response.
 */
export const sendMessageStream = async (message: string, onChunk: (text: string) => void) => {
  if (!chatSession) throw new Error("Chat session not initialized");

  try {
    const responseStream = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of responseStream) {
      // Cast chunk to GenerateContentResponse and access the .text property directly
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
