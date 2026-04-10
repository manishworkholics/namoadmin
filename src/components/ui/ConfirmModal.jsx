const ConfirmModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[350px] shadow-xl">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          Already Logged In
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          You are already logged in. Do you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;