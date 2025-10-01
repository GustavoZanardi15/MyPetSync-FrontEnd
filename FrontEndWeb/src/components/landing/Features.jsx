import cadastroPet from "../../assets/cadastroPet.png";
import agendaCompromisso from "../../assets/agendaCompromisso.png";
import servicos from "../../assets/servicos.png";
import dashboardInterativo from "../../assets/dashboardInterativo.png";
import gestaoCuidadosMedicamentos from "../../assets/gestaoCuidadosMedicamentos.png";
import gerenciamentoPerfil from "../../assets/gerenciamentoPerfil.png";
import avaliacaoCliente from "../../assets/avaliacaoCliente.png";
import agendaExclusiva from "../../assets/agendaExclusiva.png";

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

const PortalFeatures = [
  {
    title: "Gerenciamento do Perfil",
    description:
      "Crie e gerencie o perfil da empresa ou do profissional autônomo, adicionando descrição, serviços oferecidos, formas de contato, etc.",
    icon: gerenciamentoPerfil,
  },
  {
    title: "Avaliação de Clientes",
    description:
      "Os clientes podem avaliar a qualidade do serviço para aumentar a credibilidade do profissional.",
    icon: avaliacaoCliente,
  },
  {
    title: "Agenda Exclusiva",
    description:
      "Acompanhe e gerencie agendamentos em uma agenda exclusiva, podendo aceitar, recusar ou reagendar serviços.",
    icon: agendaExclusiva,
  },
];

const Features = () => {
  return (
    <div id="funcionalidades" className="bg-[#A8E6CF] py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-800 mb-8">
            Aplicativo
          </h2>
          <p className="text-xl font-semibold text-center text-teal-800 mb-16">
            O aplicativo foi desenvolvido especialmente para os <br></br>
            donos de pets que precisam de praticidade e <br></br>organização no
            dia a dia.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
            {AppFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-[#058789] p-6 rounded-3xl shadow-2xl text-center w-64"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="mx-auto mb-4 h-20 w-20"
                />
                <h3 className="font-bold mb-5 text-slate-50 text-left">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-50 text-left">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-800 mb-8">
            Portal Web
          </h2>
          <p className="text-xl font-semibold text-center text-teal-800 mb-16">
            O portal web foi desenvolvido para empresas e <br></br>
            profissionais autônomos que desejam oferecer serviços <br></br>no
            setor pet.
          </p>
          <div className="flex flex-wrap gap-8 justify-center">
            {PortalFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-[#058789] p-6 rounded-3xl shadow-2xl text-center w-72"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="mx-auto mb-4 h-20 w-20"
                />
                <h3 className="font-bold text-slate-50 text-left mb-16">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-50 text-left">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
