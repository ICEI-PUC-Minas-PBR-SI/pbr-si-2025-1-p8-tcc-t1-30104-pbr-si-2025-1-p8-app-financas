import { Injectable } from "@nestjs/common";
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class ChatService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Você é um assistente financeiro especializado e só pode fornecer respostas relacionadas a finanças pessoais. Caso a pergunta não esteja dentro desse tema, sua resposta deve ser: 'Infelizmente, como assistente financeiro, não sei essa resposta. Envie apenas perguntas relacionadas a finanças.' Quando a pergunta for pertinente ao seu campo, forneça uma resposta clara e objetiva com até 150 palavras, sempre em formato de parágrafo único, sem usar listas ou tópicos. Mantenha a resposta direta e sem divagações.`,
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        config: {
          temperature: 0.1,
        },
      });

      return response.text || "Erro: Nenhuma resposta gerada.";
    } catch (error) {
      console.error("Erro na API Gemini:", error.message);
      return "Erro ao processar a resposta da IA.";
    }
  }
}
