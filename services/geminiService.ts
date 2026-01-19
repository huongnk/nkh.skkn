
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Global chat session instance
let chatSession: Chat | null = null;

/**
 * Initializes the Gemini Chat session.
 * Sử dụng 'gemini-3-flash-preview' thay cho 'gemini-1.5-flash' để tránh lỗi 404.
 * Đây là model Flash mạnh nhất hiện nay, cực nhanh và có hạn mức Free Tier rất lớn.
 */
export const initializeGeminiChat = () => {
  // Always use a named parameter for the API key initialization and access process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
      // Model Gemini 3 hỗ trợ tính năng suy nghĩ để viết lách sâu sắc hơn
      thinkingConfig: { thinkingBudget: 0 } // Đặt bằng 0 để tối ưu tốc độ phản hồi (Flash speed)
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
        throw new Error("Tốc độ yêu cầu quá nhanh. Bạn vui lòng chờ vài giây rồi nhấn 'Viết tiếp' nhé (Hạn mức miễn phí đang được áp dụng).");
    }
    if (error.message?.includes('404')) {
        throw new Error("Lỗi cấu hình Model. Vui lòng liên hệ kỹ thuật để cập nhật phiên bản Model mới nhất.");
    }
    throw error;
  }
};
