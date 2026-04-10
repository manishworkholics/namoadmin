const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`
        flex items-center justify-center
        ${fullScreen ? "fixed inset-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm" : "py-10"}
      `}
    >
      <div className="flex flex-col items-center gap-3">

        {/* SPINNER */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>

        {/* TEXT */}
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loader;