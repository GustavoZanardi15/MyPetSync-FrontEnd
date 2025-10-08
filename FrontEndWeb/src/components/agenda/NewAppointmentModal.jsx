import {
  VscClose,
  VscCalendar,
  VscWatch,
  VscTag,
  VscInfo,
  VscPerson,
  VscMail,
  VscLock,
  VscHeart,
} from "react-icons/vsc";

const NewAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-lg w-full max-w-4xl max-h-[90vh] mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-100">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <VscCalendar className="w-5 h-5 mr-2 text-gray-700" />
              Novo Agendamento
            </h2>
            <p className="text-sm text-gray-500">
              Preencha os dados do agendamento
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            <VscClose className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Section
            title="Informações do Cliente"
            icon={VscPerson}
            color="text-gray-700"
          >
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nome do Pet"
                icon={VscHeart}
                placeholder="Nome do Pet"
              />
              <Input
                label="Nome do Tutor"
                icon={VscPerson}
                placeholder="Nome do Tutor"
              />
              <Input
                label="Telefone"
                icon={VscLock}
                placeholder="Telefone"
                type="tel"
              />
              <Input
                label="Email"
                icon={VscMail}
                placeholder="Email"
                type="email"
              />
            </div>
          </Section>
          <Section
            title="Informações do Serviço"
            icon={VscTag}
            color="text-gray-700"
          >
            <Select
              label="Tipo de Serviço"
              options={["Consulta", "Tosa", "Banho", "Vacinação"]}
            />
          </Section>
          <Section title="Data e Horário" icon={VscWatch} color="text-gray-700">
            <div className="grid grid-cols-3 gap-3">
              <Input label="Data" placeholder="DD/MM/AAAA" type="date" />
              <Select label="Horário" options={["09:00", "10:00", "11:00"]} />
              <Select
                label="Duração"
                options={["30 min", "60 min", "90 min"]}
              />
            </div>
          </Section>
          <Section
            title="Status do Agendamento"
            icon={VscInfo}
            color="text-gray-700"
          >
            <StatusRadios />
          </Section>

          <Section
            title="Observações (opcional)"
            icon={VscInfo}
            color="text-gray-700"
          >
            <TextArea placeholder="Informações adicionais sobre o agendamento..." />
          </Section>
        </div>
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 text-white font-semibold bg-gray-500">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon, color, children }) => (
  <div className="p-3 border border-gray-200">
    <h3 className={`font-semibold mb-3 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" />
      {title}
    </h3>
    {children}
  </div>
);
const Input = ({ label, icon: Icon, placeholder, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 text-gray-800 ${
          Icon ? "pl-9" : "pl-2"
        }`}
      />
    </div>
  </div>
);
const Select = ({ label, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full p-2 border border-gray-300 text-gray-800 bg-white">
      <option value="">Selecione o serviço...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
const TextArea = ({ placeholder }) => (
  <div className="flex flex-col mt-3">
    <textarea
      placeholder={placeholder}
      rows="3"
      className="w-full p-2 border border-gray-300 text-gray-800"
    ></textarea>
  </div>
);
const StatusRadios = () => (
  <div className="mb-3">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Status do Agendamento
    </label>
    <div className="flex gap-4">
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Agendado"
          defaultChecked
          className="text-gray-600"
        />
        <span>Agendado</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Confirmado"
          className="text-gray-600"
        />
        <span>Confirmado</span>
      </label>
    </div>
  </div>
);

export default NewAppointmentModal;
