import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile, Vacancy } from '../types';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getMatchAnalysis = async (vacancyDescription: string, userProfile: string) => {
  try {
    const prompt = `
      Analise a compatibilidade entre este perfil de candidato e a vaga de estágio.
      
      Perfil do Candidato:
      ${userProfile}
      
      Descrição da Vaga:
      ${vacancyDescription}
      
      Retorne APENAS um objeto JSON com a seguinte estrutura (sem markdown):
      {
        "score": number (0-100),
        "strengths": string[] (3 pontos fortes),
        "weaknesses": string[] (3 pontos a melhorar),
        "verdict": string (Resumo em 1 frase)
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro na análise de match:", error);
    return null;
  }
};

export const getChatResponse = async (message: string, context: string) => {
  try {
    const prompt = `
      Você é o assistente virtual do InternMatch, um app de vagas de estágio.
      Contexto atual: ${context}
      
      Usuário: ${message}
      
      Responda de forma curta, útil e amigável (max 2 frases).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro no chat:", error);
    return "Desculpe, estou com dificuldades para responder agora.";
  }
};

export const parseResumeWithGemini = async (resumeText: string) => {
  try {
    const prompt = `
      Extraia informações do seguinte texto de currículo para preencher um perfil de usuário.
      
      Texto do Currículo:
      ${resumeText.substring(0, 10000)}
      
      Retorne APENAS um objeto JSON com a seguinte estrutura (sem markdown):
      {
        "name": string (Nome completo),
        "university": string (Nome da universidade),
        "course": string (Curso de graduação),
        "semester": number (Semestre atual estimado, default 1),
        "skills": string[] (Lista de habilidades técnicas e soft skills),
        "bio": string (Um breve resumo profissional de 2 frases)
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao analisar currículo:", error);
    return null;
  }
};

export const generateVacanciesForProfile = async (userProfile: UserProfile): Promise<Vacancy[]> => {
  try {
    const prompt = `
      Gere 5 vagas de estágio realistas e compatíveis com o seguinte perfil de candidato.
      
      Perfil:
      Nome: ${userProfile.name}
      Curso: ${userProfile.course}
      Universidade: ${userProfile.university}
      Skills: ${userProfile.skills.join(', ')}
      
      As vagas devem ser variadas (empresas grandes, startups, remoto/híbrido).
      Retorne APENAS um array JSON com a seguinte estrutura para cada vaga (sem markdown):
      [
        {
          "id": string (único),
          "title": string (Cargo),
          "company": {
            "name": string,
            "logoUrl": string (Use "https://ui-avatars.com/api/?name=Company&background=random" mas mude o name para as iniciais da empresa),
            "rating": number (3.5-5.0),
            "location": string (Cidade, SP ou Remoto)
          },
          "matchPercentage": number (70-99),
          "description": string (3 parágrafos curtos),
          "requirements": string[] (4-5 itens),
          "benefits": string[] (3-4 itens),
          "salary": string (Ex: R$ 1.500 - R$ 2.000),
          "workMode": "Remoto" | "Híbrido" | "Presencial",
          "postedAt": "Há 2 dias" (variar)
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao gerar vagas:", error);
    return [];
  }
};

export const analyzeCompatibility = async (user: UserProfile, vacancy: Vacancy): Promise<string> => {
  const userString = `
    Nome: ${user.name}
    Curso: ${user.course}
    Universidade: ${user.university}
    Skills: ${user.skills.join(', ')}
    Bio: ${user.bio || ''}
  `;

  const vacancyString = `
    Título: ${vacancy.title}
    Empresa: ${vacancy.company.name}
    Descrição: ${vacancy.description}
    Requisitos: ${vacancy.requirements?.join(', ') || ''}
    Obrigatórios: ${vacancy.mandatoryRequirements.join(', ')}
    Desejáveis: ${vacancy.desirableRequirements.join(', ')}
  `;

  const analysis = await getMatchAnalysis(vacancyString, userString);
  return analysis ? analysis.verdict : "Não foi possível analisar a compatibilidade no momento.";
};
