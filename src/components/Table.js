import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { P } from "./Typography";

const Table = ({ data, onRowClick, className }) => {
  const headers = Object.keys(data[0]);

  return (
    <div className={classNames(className)}>
      <div>
        <div className="mt-2">
          {headers.map((header, i) => (
            <div
              key={i}
              className="border-b border-slate-500 p-4 pl-8 pt-0 pb-2 text-left"
            >
              <P bold>{header}</P>
            </div>
          ))}
        </div>
      </div>
      <div>
        {data.map((row, i) => (
          <div
            key={i}
            className="cursor-pointer"
            onClick={() => onRowClick(row)}
          >
            {headers.map((header, j) => (
              <div key={j} className="border-b border-slate-500 p-2 pl-8 pr-8">
                {React.isValidElement(row[header]) ? (
                  row[header]
                ) : (
                  <P className="mt-2">{row[header]}</P>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
};

export default Table;
