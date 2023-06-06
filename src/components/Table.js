import React from "react";
import PropTypes from "prop-types";
import { P } from "./Typography";

const Table = ({ data, onRowClick }) => {
  const headers = Object.keys(data[0]);

  return (
    <table className="table-auto">
      <thead>
        <tr className="mt-2">
          {headers.map((header, i) => (
            <th key={i} className="border-b p-4 pl-8 pt-0 pb-2 text-left">
              <P bold>{header}</P>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="hover:bg-slate-100 cursor-pointer"
            onClick={() => onRowClick(row)}
          >
            {headers.map((header, j) => (
              <td key={j} className="border-b p-2 pl-8 pr-8">
                <P className="mt-2">{row[header]}</P>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
};

export default Table;
