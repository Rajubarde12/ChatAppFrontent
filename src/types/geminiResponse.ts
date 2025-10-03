/**
 * Defines the structure for the individual generated text or media content.
 * For text responses, only the 'text' field will be populated.
 */
interface Part {
    text: string;
    // Other fields like 'inlineData' (for images) are omitted for text-only chat
  }
  
  /**
   * Represents the full content block, including the parts and the role (e.g., 'model').
   */
  interface Content {
    parts: Part[];
    role: 'user' | 'model';
  }
  
  /**
   * Represents a single generated response candidate from the model.
   */
  interface Candidate {
    content: Content;
    finishReason: string; // e.g., 'STOP' for normal completion
    index: number;
    // Other fields like 'safetyRatings' are often present but omitted for simplicity
  }
  
  /**
   * Provides metadata about the token usage for billing and quota.
   */
  interface UsageMetadata {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    thoughtsTokenCount: number;
    // 'promptTokensDetails' is a more complex array but is often ignored for basic usage
  }
  
  /**
   * The full structure of the JSON response from the 
   * 'models/gemini-2.5-flash:generateContent' endpoint.
   */
  export interface GeminiResponse {
    candidates: Candidate[];
    usageMetadata: UsageMetadata;
    modelVersion: string;
    responseId: string;
  }
  
  // ----------------------------------------------------------------------
  // 💡 How to use it in your TSX/React code:
  // ----------------------------------------------------------------------
  // async function fetchChatResponse(prompt: string): Promise<string> {
  //   // ... your fetch logic ...
  //   const data: GeminiResponse = await response.json();
  //   
  //   // Safely access the generated text
  //   const generatedText = data.candidates[0]?.content.parts[0]?.text || "No response found.";
  //   
  //   return generatedText;
  // }