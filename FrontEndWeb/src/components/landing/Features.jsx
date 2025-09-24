// src/components/Features.jsx

import React from "react";
import cadastroPet from "../../assets/cadastroPet.png";
import agendaCompromisso from "../../assets/agendaCompromisso.png";
import servicos from "../../assets/servicos.png";
import dashboardInterativo from "../../assets/dashboardInterativo.png";
import gestaoCuidadosMedicamentos from "../../assets/gestaoCuidadosMedicamentos.png";

const AppFeatures = [
  {
    title: "Cadastro de Pets",
    description:
      "Tenha acesso a informações detalhadas sobre seu pet como idade, peso, histórico de saúde, vacinas e condições especiais.",
    icon: cadastroPet,
  },
  {
    title: "Agenda de Compromisso",
    description:
      "Acompanhe a rotina do pet por meio de uma agenda inteligente, recebendo lembretes de compromissos como consultas, banho, tosa, passeios, etc.",
    icon: agendaCompromisso,
  },
  {
    title: "Serviços",
    description:
      "Encontre rapidamente serviços oferecidos por profissionais e empresas de confiança como petsitters, clínicas veterinárias, petshops, passeadores, etc.",
    icon: servicos,
  },
  {
    title: "Dashboard Interativo",
    description:
      "Acompanhe o bem-estar do seu pet de forma visual e gamificada.",
    icon: dashboardInterativo,
  },
  {
    title: "Gestão de cuidados e medicamentos",
    description:
      "Organize os registros médicos do seu pet, incluindo vacinas, exames, medicamentos e relatórios.",
    icon: gestaoCuidadosMedicamentos,
  },
];

const Features = () => {
  return (
    <div>
      <div>
        <div>
          <h2>Aplicativo</h2>
          <p>
            O aplicativo foi desenvolvido especialmente para os donos de pets
            que precisam de praticidade e organização no dia a dia.
          </p>
          <div>
            {AppFeatures.map((item, index) => (
              <div key={index}>
                <img src={item.icon} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
