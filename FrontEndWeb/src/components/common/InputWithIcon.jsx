const InputWithIcon = ({
  Icon,
  placeholder,
  type,
  inputClassName = "",
  iconClassName = "",
  ...rest
}) => {
  return (
    <div className="relative">
      <Icon
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${iconClassName}`}
      />
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500 ${inputClassName}`}
        {...rest}
      />
    </div>
  );
};

export default InputWithIcon;
