const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="text-left">
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {columns.map((col, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-gray-700 dark:text-gray-300"
                  >
                    {col.render
                      ? col.render(row, i)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
};

export default Table;