const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
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

      {/* SELECT */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-3 py-2.5 rounded-xl border text-sm transition

          bg-white text-gray-800 border-gray-200
          dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700

          focus:ring-2 focus:ring-primary outline-none

          disabled:opacity-60 disabled:cursor-not-allowed

          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

    </div>
  );
};

export default Select;