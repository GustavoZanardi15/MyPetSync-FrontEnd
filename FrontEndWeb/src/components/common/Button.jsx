import React from "react";
import PropTypes from "prop-types";

const getStyle = (variant) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
    case "primary":
    default:
      return "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
  }
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "py-2 px-4 rounded-md font-semibold transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  const style = getStyle(variant);
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${style} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
