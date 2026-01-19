
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Global chat session instance
let chatSession: Chat | null = null;

/**
 * Initializes the Gemini Chat session.
 * Sử dụng 'gemini-1.5-flash' - Model có tốc độ phản hồi cực nhanh và hạn mức (quota) 
 * miễn phí cao nhất hiện nay, phù hợp cho việc viết lách số lượng lớn.
 */
export const initializeGeminiChat = () => {
  // Always use a named parameter for the API key initialization and access process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
      // Lưu ý: thinkingConfig chỉ hỗ trợ dòng 2.5 và 3, nên đã được gỡ bỏ cho model 1.5 Flash.
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
        throw new Error("Tốc độ yêu cầu quá nhanh hoặc đã hết hạn mức miễn phí trong phút này. Vui lòng đợi 1 chút.");
    }
    throw error;
  }
};
