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
    id: 'v1',
    title: 'Estágio em Assuntos Regulatórios',
    company: {
      id: 'c1',
      name: 'Pfizer',
      logoUrl: 'https://logo.clearbit.com/pfizer.com',
      description: 'Uma das principais empresas biofarmacêuticas do mundo, aplicando ciência e recursos globais para levar terapias às pessoas.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.5
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Farmácia (conclusão a partir de dez/2026)',
      'Inglês Avançado (leitura e escrita)',
      'Bons conhecimentos de Pacote Office'
    ],
    desirableRequirements: [
      'Espanhol Básico',
      'Conhecimento da RDC 200/2017'
    ],
    benefits: [
      'Bolsa Auxílio: R$ 2.600,00',
      'Vale Refeição',
      'Assistência Médica e Odontológica',
      'Gympass'
    ],
    salaryRange: 'R$ 2.400 - R$ 2.800',
    description: 'Apoio na submissão de dossiês para a ANVISA, organização de documentação técnica e suporte às estratégias regulatórias de novos produtos.',
    status: VacancyStatus.OPEN,
    matchPercentage: 96,
    postedDate: '2025-11-18',
    matchAnalysis: {
      positives: ['Seu nível de Inglês Avançado é essencial para lidar com dossiês globais', 'Curso de Farmácia na USP é altamente valorizado', 'Semestre ideal para estágio de longa duração'],
      improvements: ['Familiarizar-se com legislações específicas (RDC)', 'Praticar leitura técnica em espanhol']
    }
  },
  {
    id: 'v2',
    title: 'Estágio em Marketing Farmacêutico',
    company: {
      id: 'c2',
      name: 'Bayer',
      logoUrl: 'https://logo.clearbit.com/bayer.com',
      description: 'Empresa global com competências essenciais nas áreas de ciências da vida: saúde e agricultura.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.4
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Farmácia, Publicidade ou Marketing',
      'Perfil analítico e criativo',
      'Inglês Intermediário'
    ],
    desirableRequirements: [
      'Power BI',
      'Conhecimento de mídias digitais'
    ],
    benefits: [
      'Bolsa competitiva',
      'Short Friday',
      'Programa de Bem-Estar'
    ],
    salaryRange: 'R$ 2.300 - R$ 2.700',
    description: 'Suporte na elaboração de materiais promocionais, análise de mercado e interação com agências de publicidade para a linha de Saúde Feminina.',
    status: VacancyStatus.OPEN,
    matchPercentage: 75,
    postedDate: '2025-11-19',
    matchAnalysis: {
      positives: ['Base técnica de Farmácia ajuda a entender o produto', 'Excel Intermediário ajuda nas análises de mercado'],
      improvements: ['Desenvolver habilidades de ferramentas de dados (Power BI)', 'Buscar conhecimentos sobre marketing digital']
    }
  },
  {
    id: 'v3',
    title: 'Estágio em Controle de Qualidade',
    company: {
      id: 'c3',
      name: 'Eurofarma',
      logoUrl: 'https://logo.clearbit.com/eurofarma.com.br',
      description: 'Multinacional farmacêutica brasileira que investe em inovação e cresce de forma sustentável.',
      location: 'Itapevi, SP',
      glassdoorRating: 4.3
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Cursando Farmácia ou Química',
      'Disponibilidade para atuar em Itapevi',
      'Conhecimento em Boas Práticas de Laboratório (BPL)'
    ],
    desirableRequirements: [
      'Iniciação Científica em análise instrumental',
      'HPLC'
    ],
    benefits: [
      'Fretado e Restaurante no local',
      'Bolsa Auxílio',
      'Cesta Básica'
    ],
    salaryRange: 'R$ 2.200 - R$ 2.500',
    description: 'Realização de análises físico-químicas de matérias-primas e produtos acabados, preparo de soluções e preenchimento de laudos.',
    status: VacancyStatus.OPEN,
    matchPercentage: 98,
    postedDate: '2025-11-20',
    matchAnalysis: {
      positives: ['Match perfeito com suas skills de BPL e Química Analítica', 'Disponibilidade técnica alinhada com o laboratório'],
      improvements: ['Se aprofundar em técnicas de HPLC (Cromatografia)', 'Garantir disponibilidade de deslocamento para Itapevi']
    }
  },
  {
    id: 'v4',
    title: 'Estágio em Pesquisa & Desenvolvimento',
    company: {
      id: 'c4',
      name: 'EMS',
      logoUrl: 'https://logo.clearbit.com/ems.com.br',
      description: 'A maior indústria farmacêutica no Brasil, líder de mercado há mais de uma década.',
      location: 'Hortolândia, SP',
      glassdoorRating: 4.1
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Cursando Farmácia',
      'Interesse em Farmacotécnica',
      'Inglês Técnico'
    ],
    desirableRequirements: [
      'Conhecimento em tecnologias farmacêuticas',
      'Estatística básica'
    ],
    benefits: [
      'Bolsa Auxílio acima do mercado',
      'Transporte Fretado',
      'Plano de Saúde'
    ],
    salaryRange: 'R$ 2.500 - R$ 3.000',
    description: 'Auxiliar no desenvolvimento de novas formulações, testes de bancada e escalonamento produtivo de medicamentos genéricos.',
    status: VacancyStatus.OPEN,
    matchPercentage: 92,
    postedDate: '2025-11-15',
    matchAnalysis: {
      positives: ['Perfil acadêmico forte da USP é muito bem visto em P&D', 'Inglês avançado facilita leitura de artigos científicos'],
      improvements: ['Estudar processos de granulação e compressão', 'Revisar estatística aplicada a validação']
    }
  },
  {
    id: 'v5',
    title: 'Estágio em Pesquisa Clínica',
    company: {
      id: 'c5',
      name: 'Johnson & Johnson',
      logoUrl: 'https://logo.clearbit.com/jnj.com',
      description: 'A maior e mais diversificada empresa de saúde do mundo.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.6
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando área da Saúde',
      'Inglês Fluente (Haverá entrevista em inglês)',
      'Organização e atenção aos detalhes'
    ],
    desirableRequirements: [
      'Conhecimento das GCP (Boas Práticas Clínicas)',
      'Excel Avançado'
    ],
    benefits: [
      'Bolsa Auxílio: R$ 2.800,00',
      'Gympass',
      'Desconto em produtos'
    ],
    salaryRange: 'R$ 2.500 - R$ 3.000',
    description: 'Suporte ao monitoramento de estudos clínicos, gestão de documentos regulatórios e contato com centros de pesquisa.',
    status: VacancyStatus.OPEN,
    matchPercentage: 88,
    postedDate: '2025-11-21',
    matchAnalysis: {
      positives: ['Seu inglês avançado é mandatório aqui', 'Curso de Farmácia oferece a base ética necessária'],
      improvements: ['Fazer cursos livres sobre Boas Práticas Clínicas (GCP)', 'Melhorar Excel para gestão de dados dos estudos']
    }
  },
  {
    id: 'v6',
    title: 'Estágio em Acesso ao Mercado',
    company: {
      id: 'c6',
      name: 'Novartis',
      logoUrl: 'https://logo.clearbit.com/novartis.com',
      description: 'Reimaginando a medicina para melhorar e estender a vida das pessoas.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.5
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Farmácia, Economia ou Administração',
      'Inglês Avançado',
      'Excel Avançado'
    ],
    desirableRequirements: [
      'Conhecimento sobre o sistema de saúde (SUS/ANS)',
      'VBA'
    ],
    benefits: [
      'Bolsa competitiva',
      'Vale Refeição alto',
      'Home Office 3x na semana'
    ],
    salaryRange: 'R$ 2.600 - R$ 3.100',
    description: 'Análise de preços, submissão de propostas para incorporação de medicamentos no SUS e planos de saúde.',
    status: VacancyStatus.OPEN,
    matchPercentage: 70,
    postedDate: '2025-11-18',
    matchAnalysis: {
      positives: ['Capacidade analítica e inglês ajudam muito', 'Base científica para entender os medicamentos de alta complexidade'],
      improvements: ['Falta Excel Avançado/VBA', 'Estudar sobre Farmacoeconomia e Rol da ANS']
    }
  },
  {
    id: 'v7',
    title: 'Estágio em Medical Affairs',
    company: {
      id: 'c7',
      name: 'Roche',
      logoUrl: 'https://logo.clearbit.com/roche.com',
      description: 'Pioneira em produtos farmacêuticos e diagnósticos.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.7
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Farmácia ou Biomedicina',
      'Inglês Avançado',
      'Habilidade de comunicação científica'
    ],
    desirableRequirements: [
      'Experiência com revisão bibliográfica',
      'Participação em ligas acadêmicas'
    ],
    benefits: [
      'Bolsa atrativa',
      'Auxílio Home Office',
      'Programa de Mentoria'
    ],
    salaryRange: 'R$ 2.800 - R$ 3.200',
    description: 'Suporte aos gerentes médicos, revisão de materiais promocionais e busca de referências científicas.',
    status: VacancyStatus.OPEN,
    matchPercentage: 95,
    postedDate: '2025-11-19',
    matchAnalysis: {
      positives: ['Perfil acadêmico da USP combina com a área Médica', 'Inglês avançado é crucial para leitura de papers'],
      improvements: ['Demonstrar experiência em revisão bibliográfica no currículo', 'Treinar oratória para apresentações científicas']
    }
  },
  {
    id: 'v8',
    title: 'Estágio em Farmacovigilância',
    company: {
      id: 'c8',
      name: 'Sanofi',
      logoUrl: 'https://logo.clearbit.com/sanofi.com.br',
      description: 'Empresa global de saúde focada nas necessidades dos pacientes.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.4
    },
    workMode: 'Remoto',
    mandatoryRequirements: [
      'Cursando Farmácia',
      'Inglês Intermediário/Avançado',
      'Atenção aos detalhes'
    ],
    desirableRequirements: [
      'Conhecimento de terminologia médica',
      'Espanhol'
    ],
    benefits: [
      'Bolsa Auxílio',
      'Vale Alimentação',
      'Gympass'
    ],
    salaryRange: 'R$ 2.200 - R$ 2.600',
    description: 'Processamento de relatos de eventos adversos, tradução de casos clínicos e inserção em banco de dados global.',
    status: VacancyStatus.OPEN,
    matchPercentage: 90,
    postedDate: '2025-11-20',
    matchAnalysis: {
      positives: ['Conhecimento em Farmacologia é a base da vaga', 'Inglês permite trabalhar com o sistema global'],
      improvements: ['Atenção redobrada a prazos regulatórios', 'Aprender termos MedDRA (dicionário médico)']
    }
  },
  {
    id: 'v9',
    title: 'Estágio em Produção Industrial',
    company: {
      id: 'c9',
      name: 'Aché Laboratórios',
      logoUrl: 'https://logo.clearbit.com/ache.com.br',
      description: 'Empresa 100% brasileira, levando mais vida às pessoas onde quer que elas estejam.',
      location: 'Guarulhos, SP',
      glassdoorRating: 4.2
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Cursando Farmácia',
      'Disponibilidade para turnos',
      'Conhecimento básico de BPF (Boas Práticas de Fabricação)'
    ],
    desirableRequirements: [
      'Lean Manufacturing',
      'Excel'
    ],
    benefits: [
      'Fretado',
      'Refeição no local',
      'Cesta Básica'
    ],
    salaryRange: 'R$ 2.300 - R$ 2.700',
    description: 'Acompanhamento de processos produtivos de sólidos e líquidos, preenchimento de ordem de produção e suporte à gestão de chão de fábrica.',
    status: VacancyStatus.OPEN,
    matchPercentage: 80,
    postedDate: '2025-11-17',
    matchAnalysis: {
      positives: ['Disposição para aprender processos industriais', 'Curso alinhado'],
      improvements: ['Buscar cursos de Lean Six Sigma/Melhoria Contínua', 'Entender fluxos de BPF na prática']
    }
  },
  {
    id: 'v10',
    title: 'Estágio em Inteligência de Mercado',
    company: {
      id: 'c10',
      name: 'Hypera Pharma',
      logoUrl: 'https://logo.clearbit.com/hypera.com.br',
      description: 'A maior empresa farmacêutica do Brasil em receita líquida.',
      location: 'São Paulo, SP',
      glassdoorRating: 4.0
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Engenharias, Adm ou Farmácia',
      'Excel Avançado (Tabelas dinâmicas, ProcV)',
      'Perfil Analítico'
    ],
    desirableRequirements: [
      'Power BI',
      'Audit Pharma (IQVIA/Close-up)'
    ],
    benefits: [
      'Bolsa Competitiva',
      'Estacionamento/Fretado',
      'PLR'
    ],
    salaryRange: 'R$ 2.400 - R$ 2.900',
    description: 'Análise de performance de vendas, estudos de market share e concorrência.',
    status: VacancyStatus.OPEN,
    matchPercentage: 65,
    postedDate: '2025-11-19',
    matchAnalysis: {
      positives: ['Bom raciocínio lógico', 'Conhecimento do mercado farmacêutico vindo do curso'],
      improvements: ['Excel precisa ser avançado (Dashboards)', 'Conhecer auditorias de mercado (IQVIA)']
    }
  },
  {
    id: 'v11',
    title: 'Estágio Comercial / Vendas',
    company: {
      id: 'c11',
      name: 'Cimed',
      logoUrl: 'https://logo.clearbit.com/cimedremedios.com.br',
      description: 'A farmacêutica do Brasil. Crescimento acelerado e foco em vendas.',
      location: 'São Paulo, SP (Campo)',
      glassdoorRating: 4.1
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Carro próprio ou habilitação B',
      'Perfil comunicativo e dinâmico',
      'Vontade de vender'
    ],
    desirableRequirements: [
      'Experiência com atendimento',
      'Negociação'
    ],
    benefits: [
      'Bolsa + Variável',
      'Ajuda de Custo (KM)',
      'Vale Refeição'
    ],
    salaryRange: 'R$ 2.000 + Variável',
    description: 'Visitação a farmácias, negociação de sell-in e positivação de pontos de venda (PDV).',
    status: VacancyStatus.OPEN,
    matchPercentage: 50,
    postedDate: '2025-11-21',
    matchAnalysis: {
      positives: ['Conhecimento técnico dos produtos'],
      improvements: ['Perfil muito técnico para vaga puramente comercial', 'Necessário ter CNH e disponibilidade de carro']
    }
  },
  {
    id: 'v12',
    title: 'Estágio em Garantia da Qualidade',
    company: {
      id: 'c12',
      name: 'Libbs Farmacêutica',
      logoUrl: 'https://logo.clearbit.com/libbs.com.br',
      description: 'Produzir medicamentos é a nossa forma de traduzir ciência em vida.',
      location: 'Embu das Artes, SP',
      glassdoorRating: 4.2
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Cursando Farmácia',
      'Inglês Técnico',
      'Organização'
    ],
    desirableRequirements: [
      'Conhecimento em validação',
      'SAP'
    ],
    benefits: [
      'Fretado',
      'Restaurante',
      'Assistência Médica'
    ],
    salaryRange: 'R$ 2.300 - R$ 2.600',
    description: 'Suporte na gestão de documentos da qualidade, controle de mudanças e desvios da qualidade.',
    status: VacancyStatus.OPEN,
    matchPercentage: 88,
    postedDate: '2025-11-16',
    matchAnalysis: {
      positives: ['Perfil organizado e metódico', 'Inglês ajuda na leitura de normas internacionais'],
      improvements: ['Estudar guias de validação de processos', 'Familiarizar-se com sistemas de gestão (SAP)']
    }
  },
  {
    id: 'v13',
    title: 'Estágio em Supply Chain Pharma',
    company: {
      id: 'c13',
      name: 'GSK',
      logoUrl: 'https://logo.clearbit.com/gsk.com',
      description: 'Empresa global de saúde baseada em ciência com um propósito especial.',
      location: 'Rio de Janeiro, RJ',
      glassdoorRating: 4.5
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Engenharias, Adm ou Farmácia',
      'Inglês Avançado',
      'Excel Intermediário'
    ],
    desirableRequirements: [
      'Power BI',
      'Conhecimento de PCP'
    ],
    benefits: [
      'Bolsa competitiva',
      'Vale Alimentação',
      'Plano de Saúde'
    ],
    salaryRange: 'R$ 2.000 - R$ 2.500',
    description: 'Planejamento de materiais, controle de estoque de medicamentos importados e indicadores de logística.',
    status: VacancyStatus.OPEN,
    matchPercentage: 60,
    postedDate: '2025-11-19',
    matchAnalysis: {
      positives: ['Inglês avançado é ótimo para supply chain global', 'Conhecimento do produto ajuda no planejamento'],
      improvements: ['Focar em logística e PCP (Planejamento e Controle da Produção)', 'Melhorar ferramentas de análise de dados']
    }
  },
  {
    id: 'v14',
    title: 'Estágio em Promoção Médica',
    company: {
      id: 'c14',
      name: 'AstraZeneca',
      logoUrl: 'https://logo.clearbit.com/astrazeneca.com.br',
      description: 'Empresa biofarmacêutica global orientada para a inovação.',
      location: 'Cotia, SP',
      glassdoorRating: 4.6
    },
    workMode: 'Híbrido',
    mandatoryRequirements: [
      'Cursando Farmácia, Bio-med ou Biologia',
      'Excelente comunicação',
      'Disponibilidade para viagens curtas'
    ],
    desirableRequirements: [
      'Carro próprio',
      'Experiência com vendas/atendimento'
    ],
    benefits: [
      'Bolsa Auxílio',
      'Reembolso KM',
      'iPad para trabalho'
    ],
    salaryRange: 'R$ 2.800 - R$ 3.200',
    description: 'Acompanhamento da força de vendas em visitas a médicos, organização de eventos científicos e análise de setor.',
    status: VacancyStatus.OPEN,
    matchPercentage: 85,
    postedDate: '2025-11-20',
    matchAnalysis: {
      positives: ['Forte base científica para dialogar com médicos', 'Universidade de renome abre portas na propaganda médica'],
      improvements: ['Desenvolver técnicas de vendas consultivas', 'Mostrar proatividade e dinamismo']
    }
  },
  {
    id: 'v15',
    title: 'Estágio em Desenvolvimento Analítico',
    company: {
      id: 'c15',
      name: 'Biolab Farmacêutica',
      logoUrl: 'https://logo.clearbit.com/biolabfarma.com.br',
      description: 'Inovação para uma vida melhor. Evolução constante com foco em saúde.',
      location: 'Jandira, SP',
      glassdoorRating: 4.2
    },
    workMode: 'Presencial',
    mandatoryRequirements: [
      'Cursando Farmácia ou Química',
      'Inglês Técnico',
      'Química Analítica'
    ],
    desirableRequirements: [
      'Cromatografia Líquida (HPLC)',
      'Dissolução'
    ],
    benefits: [
      'Bolsa Auxílio',
      'Fretado',
      'Seguro de Vida'
    ],
    salaryRange: 'R$ 2.400 - R$ 2.800',
    description: 'Desenvolvimento e validação de métodos analíticos para novos produtos, testes de estabilidade e perfil de dissolução.',
    status: VacancyStatus.OPEN,
    matchPercentage: 94,
    postedDate: '2025-11-18',
    matchAnalysis: {
      positives: ['Perfil "Lab rat" (Gosta de bancada)', 'Conhecimento sólido em Química Analítica'],
      improvements: ['Aprofundar em RDC 166 (Validação de Métodos)', 'Prática instrumental avançada']
    }
  }
];