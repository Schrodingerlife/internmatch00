import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Vacancy, UserProfile } from "../types";

const apiKey = import.meta.env.VITE_API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const analyzeCompatibility = async (user: UserProfile, vacancy: Vacancy): Promise<string> => {
  if (!apiKey) return "Configuração de API Key necessária para análise de IA.";

  const prompt = `
    Atue como um consultor de carreiras para estudantes universitários no Brasil.
    
    Perfil do Estudante:
    Nome: ${user.name}
    Curso: ${user.course}
    Semestre: ${user.semester}
    Habilidades: ${user.skills.join(', ')}

    Vaga de Estágio:
    Título: ${vacancy.title}
    Empresa: ${vacancy.company.name}
    Requisitos Obrigatórios: ${vacancy.mandatoryRequirements.join(', ')}
    Requisitos Desejáveis: ${vacancy.desirableRequirements.join(', ')}

    Analise brevemente (máximo 3 frases) por que este estudante é um bom candidato (match) ou o que falta para esta vaga. Use um tom encorajador e profissional.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Erro na análise Gemini:", error);
    return "Serviço de IA temporariamente indisponível.";
  }
};

export const getChatResponse = async (history: {role: string, text: string}[], newMessage: string, context: string): Promise<string> => {
    if (!apiKey) return "Por favor, configure a API Key no arquivo .env";

    try {
        // Construct a simple chat history for the prompt context
        const historyText = history.map(h => `${h.role === 'user' ? 'Estudante' : 'Assistente'}: ${h.text}`).join('\n');
        
        const prompt = `
        Contexto da Vaga Atual: ${context}
        
        Histórico da Conversa:
        ${historyText}
        
        Estudante: ${newMessage}
        
        Responda como um assistente de carreiras da InternMatch (seja breve, útil e amigável). Fale português do Brasil.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
        });

        return response.text || "Desculpe, não entendi.";
    } catch (error) {
        console.error(error);
        return "Erro ao conectar com o assistente.";
    }
}
