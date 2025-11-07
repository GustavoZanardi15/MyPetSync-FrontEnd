const InputWithIcon = ({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  id,
  name,
}) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-600 focus-within:border-teal-600 transition duration-150 ease-in-out">
        {Icon && (
          <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full py-2 ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 bg-white rounded-lg text-gray-700 leading-tight focus:outline-none focus:ring-0 ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default InputWithIcon;
