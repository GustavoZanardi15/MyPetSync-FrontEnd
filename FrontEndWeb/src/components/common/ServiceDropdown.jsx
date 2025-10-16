import React, { useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

const COLOR_TEAL = "#058789";

const ServiceDropdown = ({
  services,
  placeholder = "Selecione o Tipo de Serviço",
  onChange,
  value,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const displayValue = value || placeholder;

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectService = (service) => {
    if (onChange) {
      onChange(service);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative pt-2">
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="relative w-full p-3 rounded-lg border-none text-white font-semibold flex justify-between items-center hover:opacity-90 transition"
        style={{ backgroundColor: COLOR_TEAL }}
      >
        {displayValue}

        <VscChevronDown
          className={`w-5 h-5 transition-transform ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg top-full mt-1 max-h-60 overflow-y-auto">
          {services.map((service) => (
            <li
              key={service}
              onClick={() => handleSelectService(service)}
              className="p-3 text-sm text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer transition"
            >
              {service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceDropdown;
