export const VETERINARIOS = [
  {
    id: 1,
    nome: "Dra. Carolina Vivaz",
    especialidade: "Médica Veterinária Oncológica",
    estrelas: 5,
    avaliacoes: 1094,
    foto: require("../../../assets/images/home/Vet1.png"),
    experiencia: "10 anos",
    consultasRealizadas: 1240,
    precoConsulta: "R$120,00",
    bio: "Formada em Medicina Veterinária com ênfase em Oncologia. Atua com casos clínicos e tratamentos especializados.",
    avaliacoesList: [
      {
        id: 1,
        nome: "Laura S.",
        data: "2d",
        estrelas: 5,
        comentario: "Cuidou muito bem da minha cachorrinha. Atendimento humanizado e muito profissional.",
      },
      {
        id: 2,
        nome: "Marcos P.",
        data: "1sem",
        estrelas: 4,
        comentario: "Atenciosa e dedicada. Recomendo bastante!",
      },
    ],
  },
  {
    id: 2,
    nome: "Dr. Miguel Leal",
    especialidade: "Cirurgião Geral",
    estrelas: 2.5,
    avaliacoes: 385,
    foto: require("../../../assets/images/home/Vet2.png"),
    experiencia: "7 anos",
    consultasRealizadas: 540,
    precoConsulta: "R$95,00",
    bio: "Cirurgião especializado em pequenos animais. Experiência ampla em procedimentos cirúrgicos.",
    avaliacoesList: [
      {
        id: 1,
        nome: "Ana R.",
        data: "3d",
        estrelas: 3,
        comentario: "Cirurgia correu bem, mas o atendimento pós-operatório poderia ser melhor.",
      },
    ],
  },
  {
    id: 3,
    nome: "Dra. Bianca Vargas",
    especialidade: "Oncologia",
    estrelas: 4,
    avaliacoes: 124,
    foto: require("../../../assets/images/home/Vet3.png"),
    experiencia: "6 anos",
    consultasRealizadas: 46,
    precoConsulta: "R$89,90",
    bio: "Formou-se em Medicina Veterinária e se especializou em Oncologia. Foco em cuidado humanizado e planos de tratamento.",
    avaliacoesList: [
      {
        id: 1,
        nome: "Fernanda L.",
        data: "5d",
        estrelas: 5,
        comentario: "Excelente profissional! Explicou tudo com clareza e tratou muito bem do meu gato.",
      },
      {
        id: 2,
        nome: "Carlos N.",
        data: "2sem",
        estrelas: 4,
        comentario: "Muito empática e detalhista no diagnóstico.",
      },
    ],
  },
  {
    id: 4,
    nome: "Dr. Samuel Perez",
    especialidade: "Clínico Geral",
    estrelas: 4,
    avaliacoes: 231,
    foto: require("../../../assets/images/home/DogHome.png"),
    experiencia: "8 anos",
    consultasRealizadas: 860,
    precoConsulta: "R$110,00",
    bio: "Clínico geral com atendimento preventivo e acompanhamento contínuo de pacientes.",
    avaliacoesList: [
      {
        id: 1,
        nome: "Julia T.",
        data: "1d",
        estrelas: 5,
        comentario: "Excelente atendimento! Cuidou muito bem do meu cachorro idoso.",
      },
    ],
  },
];

export const AVALIACOES = [
  {
    id: 1,
    nome: "Laura S.",
    data: "2d",
    estrelas: 5,
    comentario:
      "Fiquei muito impressionada com o cuidado que minha cachorrinha Bella recebeu. Habilidades incríveis aliadas a muito carinho.",
  },
  {
    id: 2,
    nome: "Lorraine C.",
    data: "1sem",
    estrelas: 4,
    comentario:
      "Nunca deixa de responder a qualquer pergunta que precise. Cuida da minha cachorra desde filhote.",
  },
];
