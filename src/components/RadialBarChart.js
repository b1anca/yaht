import React from "react";
import PropTypes from "prop-types";
import {
  RadialBarChart as RRadialBarChart,
  ResponsiveContainer,
  Legend,
  RadialBar,
} from "recharts";
import { P } from "./Typography";

const RadialBarChart = ({ data, legend = "" }) => {
  return (
    <div className="h-[400px] relative flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RRadialBarChart
          innerRadius="10%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ fill: "#666", position: "insideStart" }}
            background
            clockWise={true}
            dataKey="value"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </RRadialBarChart>
      </ResponsiveContainer>
      {legend && <P bold>{legend}</P>}
    </div>
  );
};

RadialBarChart.propTypes = {
  data: PropTypes.array,
  legend: PropTypes.string,
};

export default RadialBarChart;
