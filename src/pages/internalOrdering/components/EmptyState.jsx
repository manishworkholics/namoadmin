import { Inbox } from "lucide-react";

const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm dark:bg-gray-800">
        <Inbox size={22} />
      </div>
      <p className="mt-4 font-semibold text-gray-900 dark:text-white">
        {title}
      </p>
      <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
