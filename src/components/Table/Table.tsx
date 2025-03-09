import React, { ReactNode } from "react";

export interface Row { [key: string]: string | number }


interface TableProps {
    data: Row[];
    render?: (row: Row, key: keyof Row) => ReactNode;
}

const Table: React.FC<TableProps> = ({ data, render }) => {
    if (data.length === 0) return <p>No data available</p>;

    const headers = Object.keys(data[0]);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b border-gray-200">
                            {headers.map((header) => (
                                <td key={header} className="px-6 py-2">
                                    {render?.(row, header) ?? row[header]}
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