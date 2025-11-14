export const SERVICOS_POR_TIPO_PRESTADOR = {
  "Pet Sistter": ["Cuidados Domiciliares", "Passeio"],
  "Veterinário Autônomo": ["Consulta", "Vacinação", "Exames"],
  Adestrador: ["Adestramento Básico", "Adestramento Avançado"],
  "Clínica Veterinária": ["Consulta", "Vacinação", "Cirurgia", "Exames"],
  "Pet Shop": ["Banho", "Tosa", "Banho e Tosa"],
  "Hotel para Pets": ["Hospedagem", "Diária"],
  "Banho e Tosa": ["Banho", "Tosa", "Banho e Tosa"],
};

export const STATUS_MAP = {
  Agendado: "scheduled",
  Confirmado: "confirmed",
  Concluído: "completed",
};

export const DURATION_MAP = { "30 min": 30, "60 min": 60, "90 min": 90 };

export const STATUS_MAP_REVERSE = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  canceled: "Cancelado",
};
