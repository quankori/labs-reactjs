import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, LineData, Time } from "lightweight-charts";
import { PriceData } from "../../types/token";

interface Props {
  width: number;
  height: number;
  data: PriceData[];
}

export const PriceChart: React.FC<Props> = ({ width, height, data }) => {
  const chartContainerRef = useRef(null);
  let chart: IChartApi | null = null;

  useEffect(() => {
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, {
        width,
        height,
      });
      const lineChart = chart.addLineSeries();

      const formattedData: LineData<Time>[] = data.map((item) => ({
        time: item.timestamp as Time, // Chuyển đổi kiểu số sang kiểu Time
        value: item.value,
      }));

      // Define the Time type (you may need to import it from the library)
      lineChart.setData(formattedData);
    }

    // Cleanup on unmount
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [data, width, height]);

  return <div ref={chartContainerRef}></div>;
};
