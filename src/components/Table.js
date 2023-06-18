import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { P } from "./Typography";

const Table = ({ data, onRowClick, className }) => {
  const headers = Object.keys(data[0]);

  return (
    <table className={classNames("table-auto", className)}>
      <thead>
        <tr className="mt-2">
          {headers.map((header, i) => (
            <th
              key={i}
              className="border-b border-slate-500 p-4 pl-8 pt-0 pb-2 text-left"
            >
              <P bold>{header}</P>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="hover:text-slate-100 cursor-pointer"
            onClick={() => onRowClick(row)}
          >
            {headers.map((header, j) => (
              <td key={j} className="border-b border-slate-500 p-2 pl-8 pr-8">
                {React.isValidElement(row[header]) ? (
                  row[header]
                ) : (
                  <P className="mt-2">{row[header]}</P>
                )}
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
  className: PropTypes.string,
};

export default Table;
