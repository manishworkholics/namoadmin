const Card = ({
  children,
  className = "",
  padding = "p-4",
  hover = false,
}) => {

  const base =
    "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition";

  const shadow =
    "shadow-sm";

  const hoverEffect = hover
    ? "hover:shadow-md hover:-translate-y-[1px]"
    : "";

  return (
    <div
      className={`${base} ${shadow} ${padding} ${hoverEffect} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;