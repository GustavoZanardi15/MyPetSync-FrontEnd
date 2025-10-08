const NewAppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            <h2>Novo Agendamento</h2>
            <p>Preencha os dados do agendamento</p>
          </div>
          <button onClick={onClose}>[ÍCONE FECHAR]</button>
        </div>
        <div>
          <Section title="Informações do Cliente">
            <div>
              <Input label="Nome do Pet" placeholder="Nome do Pet" />
              <Input label="Nome do Tutor" placeholder="Nome do Tutor" />
              <Input label="Telefone" placeholder="Telefone" type="tel" />
              <Input label="Email" placeholder="Email" type="email" />
            </div>
          </Section>
          <Section title="Informações do Serviço">
            <Select
              label="Tipo de Serviço"
              options={["Consulta", "Tosa", "Banho"]}
            />
          </Section>
          <Section title="Data e Horário">
            <div>
              <Input label="Data" placeholder="DD/MM/AAAA" type="date" />
              <Select label="Horário" options={["09:00", "10:00", "11:00"]} />
              <Select
                label="Duração"
                options={["30 min", "60 min", "90 min"]}
              />
            </div>
          </Section>
          <Section title="Observações (opcional)">
            <StatusRadios />
            <TextArea placeholder="Informações adicionais sobre o agendamento..." />
          </Section>
        </div>
        <div>
          <button onClick={onClose}>Cancelar</button>
          <button>Salvar</button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h3>[ÍCONE] {title}</h3>
    {children}
  </div>
);

const Input = ({ label, placeholder, type = "text" }) => (
  <div>
    <label>{label}</label>
    <input type={type} placeholder={placeholder} />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label>{label}</label>
    <select>
      <option value="">Selecione...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const TextArea = ({ placeholder }) => (
  <div>
    <textarea placeholder={placeholder} rows="3"></textarea>
  </div>
);

const StatusRadios = () => (
  <div>
    <label>Status do Agendamento</label>
    <div>
      <label>
        <input type="radio" name="status" value="Agendado" defaultChecked />
        <span>Agendado</span>
      </label>
      <label>
        <input type="radio" name="status" value="Confirmado" />
        <span>Confirmado</span>
      </label>
    </div>
  </div>
);

export default NewAppointmentModal;
