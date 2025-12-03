import React from "react";

export const Section = ({
  title,
  icon: Icon,
  color,
  children,
  className = "",
}) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <h3 className={`font-semibold mb-4 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" /> {title}
    </h3>
    {children}
  </div>
);

export const Input = ({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 ${
          Icon ? "pl-10" : "pl-3"
        }`}
        {...rest}
      />
    </div>
  </div>
);

export const TextArea = ({ placeholder, name, value, onChange }) => (
  <div className="flex flex-col mt-4">
    <textarea
      placeholder={placeholder}
      rows="3"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 bg-white"
    ></textarea>
  </div>
);

export const Select = ({
  label,
  options,
  defaultMessage = "Selecione o serviço...",
  name,
  value,
  onChange,
  disabled,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-[#F0F0F0] mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2.5 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-800 appearance-none bg-white ${
        disabled ? "bg-gray-200 cursor-not-allowed" : ""
      }`}
    >
      <option value="" disabled>
        {defaultMessage}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
