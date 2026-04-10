const Badge = ({ text, type = "default" }) => {

  const base =
    "px-2.5 py-1 text-xs rounded-full font-medium capitalize inline-flex items-center";

  const types = {
    default:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",

    success:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",

    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

    danger:
      "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",

    info:
      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span className={`${base} ${types[type]}`}>
      {text}
    </span>
  );
};

export default Badge;