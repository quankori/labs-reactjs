import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

interface SparklineChartProps {
  data: number[];
  color: string;
}

/**
 * Spark line chart for dashboard
 * @param param0
 * @returns
 */
export const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  color,
}) => {
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  );
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i.toString()),
    datasets: [
      {
        data: data,
        fill: false,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <Line data={chartData} options={chartOptions} width={200} height={100} />
  );
};
