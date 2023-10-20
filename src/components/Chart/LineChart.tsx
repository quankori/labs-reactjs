import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, LineData, Time } from "lightweight-charts";
import { PriceData } from "../../types/token";

interface Props {
  data: PriceData[];
}

/**
 * Price chart for detail page
 * @param param0
 * @returns
 */
export const LineChart: React.FC<Props> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  let chart: IChartApi | null = null;
  useEffect(() => {
    console.log(chartContainerRef.current?.clientWidth);
    console.log(chartContainerRef.current?.clientHeight);
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current?.clientWidth,
        height: chartContainerRef.current?.clientHeight || 500,
      });
      const lineChart = chart.addLineSeries();

      const formattedData: LineData<Time>[] = data.map((item) => ({
        time: item.timestamp as Time,
        value: item.value,
      }));

      lineChart.setData(formattedData);
    }

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};
