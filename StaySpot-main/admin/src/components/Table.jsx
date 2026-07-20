import React, { useEffect, useRef } from "react";

const Table = ({ headers, data }) => {
    const tableRef = useRef(null);

    

    useEffect(() => {
        if (tableRef.current) {
            const columns = [
                ...headers.map(header => ({
                    data: header,
                    title: header,
                })),
                {
                    title: "Actions",
                    data: null,
                    render: () => `
                        <button class="edit-btn px-2 py-1 bg-blue-600 text-white rounded-md mr-3">Edit</button>
                        <button class="delete-btn px-2 py-1 bg-red-600 text-white rounded-md">Delete</button>
                    `,
                    orderable: false,
                },
            ];

            $.fn.dataTable.ext.errMode = "none";

            const dataTable = $(tableRef.current).DataTable({
                data: data,
                columns: columns,
                responsive: true,
                destroy: true,
                processing: true,
                searchable: true,
                ordering: true,

                createdRow: function(row, data, dataIndex) {

                    $(row).addClass('border-b border-zinc-700 hover:bg-zinc-700 max-h-[20vh] overflow-hidden');
                    $(row).find('td').each(function(index) {
                        if (index < headers.length) { // Skip actions column
                            const cellData = data[headers[index]];
                            if (cellData && cellData.toString().length > 100) {
                                $(this).attr('title', cellData);
                            }
                        }
                    });
                }
            });

            return () => {
                if (dataTable) {
                    dataTable.destroy();
                    $(".dataTables_wrapper").remove();
                }
            };
        }
    }, [data, headers]);


    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        text = text.toString(); // Convert to string in case of numbers
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div className="p-4 bg-zinc-900 text-white w-full overflow-hidden">
            <table
                ref={tableRef}
                className="display min-w-full divide-y divide-gray-700 bg-zinc-800 text-sm text-left text-zinc-300 rounded-lg "
            >
                <thead className="bg-zinc-700">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 text-capitalize"
                            >
                                {header}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-zinc-700  max-h-[10vh] overflow-hidden">
                            {headers.map((header, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-2">
                                    {truncateText(row[header])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
