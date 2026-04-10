const Pagination = ({
    page,
    total,
    limit,
    onPageChange,
}) => {
    const totalPages = Math.ceil(total / limit);

    const getPages = () => {
        let pages = [];
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center gap-3 mt-6">

            {/* TOTAL */}
            <p className="text-sm text-gray-400">
                Total: <span className="font-semibold">{total}</span> Orders
            </p>

            {/* PAGINATION */}
            <div className="flex items-center gap-2 flex-wrap justify-center">

                {/* PREV */}
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-4 py-1.5 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 transition"
                >
                    Prev
                </button>

                {/* PAGE NUMBERS */}
                {getPages().map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition
          ${page === p
                                ? "bg-primary text-white"
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                    >
                        {p}
                    </button>
                ))}

                {/* NEXT */}
                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-4 py-1.5 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 transition"
                >
                    Next
                </button>

            </div>

            {/* JUMP INPUT */}
            <input
                type="number"
                min="1"
                max={totalPages}
                placeholder="Go to page"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const val = Number(e.target.value);
                        if (val >= 1 && val <= totalPages) {
                            onPageChange(val);
                        }
                    }
                }}
                className="w-40 text-center px-3 py-2 rounded-xl border border-gray-700 bg-gray-900 focus:outline-none focus:ring-1 focus:ring-primary"
            />

        </div>
    );
};

export default Pagination;