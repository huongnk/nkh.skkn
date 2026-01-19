
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Global chat session instance
let chatSession: Chat | null = null;

/**
 * Initializes the Gemini Chat session.
 * Sử dụng 'gemini-3-flash-preview' - Model tối ưu cho các tác vụ văn bản thông thường
 * và hoàn toàn tương thích với gói API miễn phí (Free Tier).
 */
// Fix: Use process.env.API_KEY directly inside the initialization instead of passing as argument.
export const initializeGeminiChat = () => {
  // Always use a named parameter for the API key initialization and access process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
      // Gemini 3 Flash hỗ trợ thinkingBudget tối đa là 24576
      thinkingConfig: { thinkingBudget: 24576 } 
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
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Xử lý lỗi phổ biến khi dùng key miễn phí (Rate limit)
    if (error.message?.includes('429')) {
        throw new Error("Tốc độ yêu cầu quá nhanh. Vui lòng đợi giây lát vì bạn đang dùng API miễn phí.");
    }
    throw error;
  }
};
