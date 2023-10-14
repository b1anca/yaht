import React from "react";
import PropTypes from "prop-types";
import {
  Radar,
  RadarChart as RRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../constants";
import { P } from "./Typography";

const RadarChart = ({ data, legend = "" }) => {
  return (
    <div className="h-[500px] relative flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            dataKey="A"
            stroke={COLORS.blue500}
            fill={COLORS.blue500}
            fillOpacity={0.5}
          />
        </RRadarChart>
      </ResponsiveContainer>
      {legend && <P bold>{legend}</P>}
    </div>
  );
};

RadarChart.propTypes = {
  data: PropTypes.array,
  legend: PropTypes.string,
};

export default RadarChart;
