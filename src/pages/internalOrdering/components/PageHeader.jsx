const PageHeader = ({ eyebrow, title, description, action }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;
