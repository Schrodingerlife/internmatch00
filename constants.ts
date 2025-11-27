import { Vacancy, UserProfile, VacancyStatus } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Juliana Mendes',
  university: 'Universidade de São Paulo (USP)',
  course: 'Farmácia e Bioquímica',
  semester: 7,
  skills: ['Farmacologia', 'Inglês Avançado', 'Controle de Qualidade', 'BPL', 'Excel Intermediário', 'Química Analítica'],
  email: 'juliana.mendes@usp.br'
};

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Estágio em Desenvolvimento Front-end',
    company: {
      name: 'Itaú Unibanco',
      logoUrl: 'https://logo.clearbit.com/itau.com.br',
      description: 'O Itaú Unibanco é o maior banco privado do Brasil, com foco em inovação e transformação digital. Buscamos talentos para construir o futuro do setor bancário.',
      website: 'https://carreiras.itau.com.br/',
      glassdoorRating: 4.5
    },
    location: 'São Paulo, SP (Híbrido)',
    salary: 'R$ 2.800,00',
    description: 'Você fará parte da comunidade de tecnologia do Itaú, atuando no desenvolvimento de interfaces modernas e acessíveis para milhões de usuários.',
    requirements: [
      'Cursando Ciência da Computação, Engenharia de Software ou áreas correlatas',
      'Conhecimento em HTML, CSS e JavaScript',
      'Interesse em React e Angular',
      'Vontade de aprender e trabalhar em equipe'
    ],
    mandatoryRequirements: [
      'Ensino superior em andamento (previsão de formatura a partir de Dez/2025)',
      'Lógica de programação',
      'Disponibilidade para estagiar 6h diárias'
    ],
    desirableRequirements: [
      'Conhecimento em Git',
      'Noções de acessibilidade web',
      'Inglês intermediário'
    ],
    benefits: [
      'Bolsa-auxílio compatível com o mercado',
      'Vale-refeição e Vale-alimentação',
      'Assistência médica e odontológica',
      'Seguro de vida',
      'Gympass'
    ],
    postedAt: 'Há 2 dias',
    applyLink: 'https://carreiras.itau.com.br/vagas',
    matchAnalysis: {
      score: 92,
      positives: ['Cultura forte de aprendizado', 'Oportunidade de efetivação', 'Stack tecnológica moderna'],
      improvements: ['Necessário adaptação a processos corporativos grandes']
    }
  },
  {
    id: '2',
    title: 'Estágio em Ciência de Dados',
    company: {
      name: 'iFood',
      logoUrl: 'https://logo.clearbit.com/ifood.com.br',
      description: 'O iFood é uma empresa brasileira de tecnologia líder em delivery online na América Latina. Nossa missão é alimentar o futuro do mundo.',
      website: 'https://carreiras.ifood.com.br/',
      glassdoorRating: 4.6
    },
    location: 'Remoto',
    salary: 'R$ 3.000,00',
    description: 'Junte-se ao time de Data Science do iFood para resolver problemas complexos de logística e recomendação usando Machine Learning.',
    requirements: [
      'Cursando Estatística, Matemática, Computação ou Engenharia',
      'Conhecimento em Python ou R',
      'Noções de SQL',
      'Pensamento analítico'
    ],
    mandatoryRequirements: [
      'Matrícula ativa em curso superior',
      'Familiaridade com bibliotecas de dados (Pandas, NumPy)',
      'Inglês técnico para leitura'
    ],
    desirableRequirements: [
      'Projetos acadêmicos em ML',
      'Conhecimento em ferramentas de visualização (Tableau, PowerBI)',
      'Participação em hackathons'
    ],
    benefits: [
      'Bolsa-auxílio competitiva',
      'iFood Flex (benefícios flexíveis)',
      'Trabalho 100% remoto',
      'Apoio psicológico'
    ],
    postedAt: 'Há 1 semana',
    applyLink: 'https://carreiras.ifood.com.br/vagas',
    matchAnalysis: {
      score: 88,
      positives: ['Empresa "Remote First"', 'Ambiente inovador e ágil', 'Forte cultura de dados'],
      improvements: ['Ritmo acelerado pode ser desafiador']
    }
  },
  {
    id: '3',
    title: 'Estágio em Engenharia de Software',
    company: {
      name: 'Nubank',
      logoUrl: 'https://logo.clearbit.com/nubank.com.br',
      description: 'O Nubank é a maior plataforma de banco digital do mundo fora da Ásia. Lutamos contra a complexidade para empoderar as pessoas.',
      website: 'https://nubank.com.br/carreiras/',
      glassdoorRating: 4.4
    },
    location: 'São Paulo, SP (Híbrido)',
    salary: 'R$ 3.200,00',
    description: 'Atue no desenvolvimento de microsserviços escaláveis em Clojure e ajude a manter a confiabilidade dos nossos sistemas.',
    requirements: [
      'Cursando graduação em tecnologia',
      'Paixão por programação funcional (não precisa saber Clojure, nós ensinamos!)',
      'Inglês avançado é um diferencial'
    ],
    mandatoryRequirements: [
      'Graduação com término previsto para 2026',
      'Bons fundamentos de computação',
      'Capacidade de resolução de problemas'
    ],
    desirableRequirements: [
      'Experiência prévia com programação (projetos pessoais contam)',
      'Contribuição em Open Source',
      'Inglês fluente'
    ],
    benefits: [
      'Bolsa auxílio',
      'NuLanguage (programa de idiomas)',
      'Participação no NuEquity',
      'Auxílio creche'
    ],
    postedAt: 'Há 3 dias',
    applyLink: 'https://nubank.com.br/carreiras/',
    matchAnalysis: {
      score: 95,
      positives: ['Stack tecnológica única (Clojure)', 'Ambiente global', 'Benefícios diferenciados'],
      improvements: ['Curva de aprendizado íngreme em Clojure']
    }
  },
  {
    id: '4',
    title: 'Estágio em UX/UI Design',
    company: {
      name: 'Globo',
      logoUrl: 'https://logo.clearbit.com/globo.com',
      description: 'A Globo é uma das maiores empresas de mídia do mundo. Criamos experiências digitais que conectam milhões de brasileiros.',
      website: 'https://vempraglobo.gupy.io/',
      glassdoorRating: 4.3
    },
    location: 'Rio de Janeiro, RJ (Híbrido)',
    salary: 'R$ 2.500,00',
    description: 'Participe da criação de interfaces para o Globoplay e G1, focando na experiência do usuário e design system.',
    requirements: [
      'Cursando Design, Publicidade ou áreas afins',
      'Portfólio (mesmo que acadêmico)',
      'Conhecimento em Figma'
    ],
    mandatoryRequirements: [
      'Estudantes a partir do 3º período',
      'Olhar estético apurado',
      'Empatia com o usuário'
    ],
    desirableRequirements: [
      'Noções de HTML/CSS',
      'Conhecimento em metodologias ágeis',
      'Motion design básico'
    ],
    benefits: [
      'Bolsa estágio',
      'Vale-refeição',
      'Transporte fretado',
      'Descontos em produtos Globo'
    ],
    postedAt: 'Há 5 dias',
    applyLink: 'https://vempraglobo.gupy.io/',
    matchAnalysis: {
      score: 85,
      positives: ['Grande visibilidade dos projetos', 'Equipe de design madura', 'Oportunidade de carreira'],
      improvements: ['Processos podem ser burocráticos']
    }
  },
  {
    id: '5',
    title: 'Estágio em Segurança da Informação',
    company: {
      name: 'Mercado Livre',
      logoUrl: 'https://logo.clearbit.com/mercadolivre.com.br',
      description: 'O Mercado Livre é a companhia líder em tecnologia para e-commerce e serviços financeiros na América Latina.',
      website: 'https://mercadolivre.gupy.io/',
      glassdoorRating: 4.7
    },
    location: 'Osasco, SP (Presencial)',
    salary: 'R$ 2.900,00',
    description: 'Ajude a proteger os dados de milhões de usuários, atuando na identificação de vulnerabilidades e resposta a incidentes.',
    requirements: [
      'Cursando Segurança da Informação, Redes ou Computação',
      'Interesse em Cybersecurity',
      'Conhecimento básico de redes e sistemas operacionais'
    ],
    mandatoryRequirements: [
      'Formatura prevista para Dez/2025 ou Jul/2026',
      'Lógica de programação (Python/Bash)',
      'Inglês técnico'
    ],
    desirableRequirements: [
      'Certificações iniciais em segurança',
      'Participação em CTFs',
      'Conhecimento em Cloud (AWS/GCP)'
    ],
    benefits: [
      'Bolsa competitiva',
      'Transporte fretado',
      'Restaurante no local',
      'Gympass'
    ],
    postedAt: 'Há 1 dia',
    applyLink: 'https://mercadolivre.gupy.io/',
    matchAnalysis: {
      score: 90,
      positives: ['Líder de mercado', 'Área de segurança em expansão', 'Cultura dinâmica'],
      improvements: ['Modelo presencial pode não agradar a todos']
    }
  }
];