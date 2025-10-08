import {
  VscClose,
  VscCalendar,
  VscTag,
  VscInfo,
  VscPerson,
  VscMail,
} from "react-icons/vsc";
import { MdOutlinePets, MdOutlineWatchLater } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

const NewAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#A8E6CF] z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#003637] flex items-center">
              <VscCalendar className="w-6 h-6 mr-2 text-[#003637]" />
              Novo Agendamento
            </h2>
            <p className="text-sm text-[#003637] mt-1">
              Preencha os dados do agendamento
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition-colors"
          >
            <VscClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <Section
            title="Informações do Cliente"
            icon={VscPerson}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nome do Pet"
                icon={MdOutlinePets}
                placeholder="Nome do Pet"
              />
              <Input
                label="Nome do Tutor"
                icon={VscPerson}
                placeholder="Nome do Tutor"
              />
              <Input
                label="Telefone"
                icon={FiPhoneCall}
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
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <Select
              label="Tipo de Serviço"
              options={["Consulta", "Tosa", "Banho", "Vacinação"]}
            />
          </Section>
          <Section
            title="Data e Horário"
            icon={MdOutlineWatchLater}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <div className="grid grid-cols-3 gap-4">
              <Input label="Data" placeholder="DD/MM/AAAA" type="date" />
              <Select
                label="Horário"
                options={["09:00", "10:00", "11:00"]}
                defaultMessage="Selecione o horário..."
              />

              <Select
                label="Duração"
                options={["30 min", "60 min", "90 min"]}
                dafaultMessage="Selecione o serviço..."
              />
            </div>
          </Section>
          <Section
            title="Status do Agendamento"
            icon={VscInfo}
            color="text-gray-700"
            className="bg-gray-50"
          >
            <StatusRadios />
          </Section>
          <Section
            title="Observações (opcional)"
            icon={VscInfo}
            color="text-[#F0F0F0]"
            className="bg-[#058789]"
          >
            <TextArea placeholder="Informações adicionais sobre o agendamento..." />
          </Section>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button className="px-6 py-2 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-colors shadow-md">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
const Section = ({ title, icon: Icon, color, children, className = "" }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <h3 className={`font-semibold mb-4 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" />
      {title}
    </h3>
    {children}
  </div>
);
const Input = ({ label, icon: Icon, placeholder, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 ${
          Icon ? "pl-10" : "pl-3"
        }`}
      />
    </div>
  </div>
);
const Select = ({
  label,
  options,
  defaultMessage = "Selecione o serviço...",
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>
    <select className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 appearance-none bg-white">
      <option value="">{defaultMessage}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
const TextArea = ({ placeholder }) => (
  <div className="flex flex-col mt-4">
    <textarea
      placeholder={placeholder}
      rows="3"
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 bg-wh"
    ></textarea>
  </div>
);
const StatusRadios = () => (
  <div className="mb-4">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Status do Agendamento
    </label>
    <div className="flex gap-6">
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Agendado"
          defaultChecked
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Agendado</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-800">
        <input
          type="radio"
          name="status"
          value="Confirmado"
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>Confirmado</span>
      </label>
    </div>
  </div>
);

export default NewAppointmentModal;
