const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) => {

  const base =
    "flex items-center justify-center gap-2 rounded-xl font-medium transition active:scale-95";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-orange-600",

    secondary:
      "border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    md: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;