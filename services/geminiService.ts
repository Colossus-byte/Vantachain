
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { QuizQuestion, ChatMessage, UserProgress, Recommendation, Language } from "../types";
import { TOPICS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLanguageName = (lang: Language) => {
  switch(lang) {
    case Language.ES: return 'Spanish';
    case Language.FR: return 'French';
    case Language.ZH: return 'Chinese';
    default: return 'English';
  }
};

export const getTutorResponse = async (userMessage: string, context: string, history: ChatMessage[], language: Language = Language.EN) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are CryptoPath AI, an expert cryptocurrency and blockchain tutor. 
        Your goal is to help students learn based on the current context: "${context}". 
        Keep explanations clear, engaging, and accurate. 
        MANDATORY: You must respond in ${getLanguageName(language)}.
        Use Markdown for formatting.`,
      },
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my blockchain brain right now. Please try again!";
  }
};

export const fetchIntelligencePulse = async (topicTitle: string, language: Language = Language.EN) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief summary of the 3 most important recent news items or technical developments regarding "${topicTitle}" in the crypto industry from the last 6 months.
      MANDATORY: You must respond in ${getLanguageName(language)}.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri
      })) || []
    };
  } catch (error) {
    console.error("Pulse Error:", error);
    return null;
  }
};

export const generateLessonAudio = async (text: string, language: Language = Language.EN) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Narrate the following crypto lesson clearly and professionally in ${getLanguageName(language)}: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

export const generateQuiz = async (lessonContent: string, language: Language = Language.EN): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the following lesson content, generate exactly 3 challenging multiple-choice questions.
      MANDATORY: The questions, options, and explanations MUST be in ${getLanguageName(language)}.
      Content: "${lessonContent}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    const jsonStr = (response.text || "[]").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};

export const generateVisualPrompt = async (lessonTitle: string, lessonContent: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this cryptocurrency lesson into a high-end cinematic visual prompt for a video generation model. 
      Lesson Title: ${lessonTitle}
      Lesson Content: ${lessonContent}
      
      Requirements:
      1. Describe an abstract, futuristic 3D animation.
      2. Use a "CryptoPath" aesthetic: Obsidian blacks, Emerald greens, and Gold accents.
      3. Focus on visual metaphors for the technical concepts described.
      4. Keep the description under 60 words.
      5. Do not use conversational filler, just the prompt text.`,
    });
    return response.text || `Cinematic 3D animation of ${lessonTitle} with emerald and gold data streams.`;
  } catch (error) {
    console.error("Visual Prompt Generation Error:", error);
    return `Cinematic 3D animation of ${lessonTitle} with emerald and gold data streams.`;
  }
};

export const generatePathRecommendation = async (progress: UserProgress): Promise<Recommendation | null> => {
  try {
    const completedTitles = TOPICS.filter(t => progress.completedTopics.includes(t.id)).map(t => t.title);
    const availableTopics = TOPICS.filter(t => !progress.completedTopics.includes(t.id));
    
    if (availableTopics.length === 0) return null;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this user's crypto learning progress:
      Completed Topics: ${completedTitles.join(', ')}
      Quiz History: ${JSON.stringify(progress.quizHistory || [])}
      
      Recommend one of the following upcoming topic IDs: ${availableTopics.map(t => `${t.id} (${t.title})`).join(', ')}.
      Suggest a specialization role (e.g., 'Protocol Engineer', 'DeFi Analyst', 'Security Specialist') and explain why based on their strengths.
      MANDATORY: The response MUST be in ${getLanguageName(progress.language)}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            rationale: { type: Type.STRING },
            targetTopicId: { type: Type.STRING },
            estimatedPathLength: { type: Type.STRING },
            specializationRole: { type: Type.STRING },
          },
          required: ["title", "rationale", "targetTopicId", "estimatedPathLength", "specializationRole"],
        },
      },
    });

    const jsonStr = (response.text || "null").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Recommendation Error:", error);
    return null;
  }
};

export const auditCode = async (code: string, language: Language = Language.EN) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a high-level security audit on the following smart contract code. 
      Identify potential vulnerabilities (e.g., reentrancy, overflow, access control issues) and suggest optimizations.
      MANDATORY: You must respond in ${getLanguageName(language)}.
      Code:
      \`\`\`
      ${code}
      \`\`\``,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
                  description: { type: Type.STRING },
                  fix: { type: Type.STRING },
                },
                required: ["type", "severity", "description", "fix"],
              },
            },
            optimizations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            securityScore: { type: Type.INTEGER, description: "Score from 0 to 100" },
            summary: { type: Type.STRING },
          },
          required: ["vulnerabilities", "optimizations", "securityScore", "summary"],
        },
      },
    });

    const jsonStr = (response.text || "{}").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Audit Error:", error);
    return null;
  }
};
