const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error = "",
}) => {
  return (
    <div className="space-y-1">

      {/* LABEL */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* INPUT */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2.5 rounded-xl border text-sm transition

          bg-white text-gray-800 border-gray-200
          dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700

          focus:ring-2 focus:ring-primary outline-none

          disabled:opacity-60 disabled:cursor-not-allowed

          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
      />

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

    </div>
  );
};

export default Input;