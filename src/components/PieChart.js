import React from "react";
import PropTypes from "prop-types";
import {
  PieChart as RPieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { COLORS } from "../constants";
import { P } from "./Typography";

const PieChart = ({
  data,
  color = COLORS.blue500,
  innerLabel = "",
  withTooltip = false,
}) => {
  return (
    <div className="h-[130px] w-[130px] relative">
      {innerLabel && (
        <P
          bold
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {innerLabel}
        </P>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RPieChart>
          <Pie
            data={data}
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
            stroke={COLORS.slate400}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? color : "transparent"}
              />
            ))}
          </Pie>
          {withTooltip && <Tooltip />}
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  innerLabel: PropTypes.string,
  withTooltip: PropTypes.bool,
};

export default PieChart;
