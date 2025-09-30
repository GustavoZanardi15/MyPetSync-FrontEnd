import React from "react";

const InputWithIcon = ({ Icon, placeholder, type, ...rest }) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 pl-10 rounded-lg border-none bg-gray-200 text-gray-800 placeholder-gray-500"
        {...rest}
      />
    </div>
  );
};

export default InputWithIcon;
