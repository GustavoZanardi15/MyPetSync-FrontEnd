export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) {
    return {
      dateLabel: "Data não informada",
      diaSemana: "",
      hora: "",
    };
  }

  const date = new Date(dateTimeString);
  if (Number.isNaN(date.getTime())) {
    return {
      dateLabel: "Data inválida",
      diaSemana: "",
      hora: "",
    };
  }

  const dia = String(date.getDate()).padStart(2, "0");
  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  const diasSemana = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
  ];

  const mes = meses[date.getMonth()];
  const diaSemana = diasSemana[date.getDay()];
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return {
    dateLabel: `${dia} ${mes}`,
    diaSemana,
    hora: `${horas}:${minutos}`,
  };
};

export const getPeriodoFromDate = (dateTimeString) => {
  if (!dateTimeString) return "Outros";

  const d = new Date(dateTimeString);
  if (Number.isNaN(d.getTime())) return "Outros";

  const hoje = new Date();
  const mesmoDia =
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear();

  if (mesmoDia) return "Hoje";

  const mesmoMes =
    d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();

  if (mesmoMes) return "Este mês";

  return `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

export const mapAppointmentFromApi = (appointment) => {
  const { dateLabel, diaSemana, hora } = formatDateTime(appointment.dateTime);
  const periodo = getPeriodoFromDate(appointment.dateTime);

  let petName = "";
  
  if (appointment.pet && typeof appointment.pet === 'object') {
    if (appointment.pet.nome) {
      petName = appointment.pet.nome;
    } 
    else if (appointment.pet.name) {
      petName = appointment.pet.name;
    }
  }
  else if (appointment.animal && typeof appointment.animal === 'object') {
    if (appointment.animal.nome) {
      petName = appointment.animal.nome;
    } else if (appointment.animal.name) {
      petName = appointment.animal.name;
    }
  }
  else if (appointment.petName) {
    petName = appointment.petName;
  } else if (appointment.animalName) {
    petName = appointment.animalName;
  }

  let profissionalEspecialidade = "Serviço pet específico";
  
  if (appointment.reason) {
    profissionalEspecialidade = appointment.reason;
  }
  else if (appointment.service && typeof appointment.service === 'object' && appointment.service.name) {
    profissionalEspecialidade = appointment.service.name;
  }

  return {
    id: appointment._id?.toString() ?? String(Math.random()),
    profissionalNome: appointment.provider?.name ?? "Prestador não informado",
    profissionalEspecialidade,
    petName, 
    dateLabel,
    diaSemana,
    hora,
    periodo,
    status: appointment.status ?? "pending",
    isReviewed: appointment.isReviewed ?? false,
  };
};

export const groupByPeriodo = (items) => {
  const groups = items.reduce((acc, item) => {
    const key = item.periodo || "Outros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return Object.keys(groups)
    .sort((a, b) => {
      const ordem = ["Hoje", "Este mês"];
      const ia = ordem.indexOf(a);
      const ib = ordem.indexOf(b);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    })
    .map((periodo) => ({
      title: periodo,
      data: groups[periodo],
    }));
};