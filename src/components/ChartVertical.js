import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export function ChartVertical(props) {
  const { dataSet, keyData, labelKey, backgroundColor } = props;

  const getData = () => {
    return {
      labels: dataSet.map((res) => {
        return res[keyData];
      }),
      datasets: [
        {
          label: labelKey,
          data: dataSet.map((res) => res.measurement_count),
          backgroundColor: backgroundColor,
        },
      ],
    };
  };
  return <Bar options={options} data={getData()} />;
}
