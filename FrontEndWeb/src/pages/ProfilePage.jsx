import ProfileCard from "../components/profile/ProfileCard";
import ProfileInfoBlock from "../components/profile/ProfileInfoBlock";

const EditIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-5 h-5 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Zm0 0L19.5 7.125"
    />
  </svg>
);

const StyledDataDisplay = ({ value }) => (
  <div className="bg-white p-3 rounded-lg text-teal-800 font-medium border border-black">
    {value}
  </div>
);

const MOCK_COMPANY_DATA = {
  profile: {
    name: "Clínica Veterinária São José",
    category: "Clínica Veterinária",
    imageUrl: "https://placehold.co/128x128/FFBD70/ffffff?text=PET",
    clientCount: 156,
    rating: 4.9,
    reviewCount: 89,
  },
  basicInfo: [
    {
      label: "Nome da Empresa",
      value: <StyledDataDisplay value="Clínica Veterinária São José" />,
    },
    {
      label: "Tipo de Serviço",
      value: <StyledDataDisplay value="Clínica Veterinária" />,
    },
  ],
  contactInfo: [
    {
      label: "Email",
      value: <StyledDataDisplay value="clinicasjose@gmail.com" />,
    },
    { label: "Telefone", value: <StyledDataDisplay value="(11) 99999-9999" /> },
    {
      label: "Endereço",
      value: <StyledDataDisplay value="Rua das Flores, 123 - São Paulo, SP" />,
      fullWidth: true,
    },
    { label: "CNPJ", value: <StyledDataDisplay value="12.345.678/0001-90" /> },
    { label: "WhatsApp", value: <StyledDataDisplay value="(11) 99999-9999" /> },
  ],
  additionalInfo: [
    {
      label: "Descrição da Empresa",
      value: (
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
          Clínica veterinária especializada em cuidados completos para pets, com
          mais de 10 anos de experiência no mercado.
        </div>
      ),
      fullWidth: true,
    },
    {
      label: "Horário de Funcionamento",
      value: (
        <div className="space-y-2">
          <StyledDataDisplay value="Segunda a Sexta: 8h às 18h." />
          <StyledDataDisplay value="Sábado: 8h às 12h." />
        </div>
      ),
    },
    {
      label: "Serviços",
      value: (
        <div className="p-3 rounded-lg bg-teal-50 border border-black text-teal-800 font-medium">
          Consulta veterinária, Vacinação, Castração, Limpeza Dental, Aplicação
          de Medicamentos, Consulta de Emergência.
        </div>
      ),
      fullWidth: true,
    },
  ],
};
const ProfilePage = () => {
  const handleEditProfile = () => {
    console.log("TO DO: Navegar para a tela de Edição de Perfil");
  };
  return (
    <div className="p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#003637]">
            Perfil da Empresa
          </h1>
          <p className="text-md font-semibold text-[#003637]">
            Gerencie as informações da sua empresa
          </p>
        </div>
        <button
          onClick={handleEditProfile}
          className="flex items-center px-6 py-2 bg-[#058789] text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg"
        >
          <EditIcon className="w-5 h-5 mr-2 fill-white" />
          Editar Perfil
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={MOCK_COMPANY_DATA.profile.name}
            category={MOCK_COMPANY_DATA.profile.category}
            imageUrl={MOCK_COMPANY_DATA.profile.imageUrl}
            clientCount={MOCK_COMPANY_DATA.profile.clientCount}
            rating={MOCK_COMPANY_DATA.profile.rating}
            reviewCount={MOCK_COMPANY_DATA.profile.reviewCount}
          />
        </div>
        <div className="lg:col-span-2 space-y-6 ">
          <ProfileInfoBlock
            title="Informações Básicas"
            data={MOCK_COMPANY_DATA.basicInfo}
            editable
          />

          <ProfileInfoBlock
            title="Informações de Contato"
            data={MOCK_COMPANY_DATA.contactInfo}
            editable
          />

          <ProfileInfoBlock
            title="Informações Adicionais"
            data={MOCK_COMPANY_DATA.additionalInfo}
            editable
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
