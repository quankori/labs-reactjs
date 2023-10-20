import React, { useEffect, useRef } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import { OHLCData } from "../../types/token";
import { formatDate } from "../../utils/format";
interface Props {
  width: number;
  height: number;
  data: OHLCData[];
}

export const OHLCChart: React.FC<Props> = ({ width, height, data }) => {
  const chartContainerRef = useRef(null);
  let chart: IChartApi | null = null;

  const processData = (rawData: OHLCData[]): OHLCData[] => {
    let processedData: OHLCData[] = [];
    let currentDate: string | null = null;
    let dayData: OHLCData | null = null;

    rawData.forEach((entry) => {
      let date = formatDate(entry.timestamp);
      if (currentDate !== date) {
        if (dayData) {
          processedData.push(dayData);
        }
        currentDate = date;
        dayData = {
          timestamp: entry.timestamp,
          open: entry.open,
          high: entry.high,
          low: entry.low,
          close: entry.close,
        };
      } else {
        if (dayData) {
          dayData.high = Math.max(dayData.high, entry.high);
          dayData.low = Math.min(dayData.low, entry.low);
          dayData.close = entry.close;
        }
      }
    });

    if (dayData) {
      processedData.push(dayData);
    }

    return processedData;
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, {
        width,
        height,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });
      const candlestickSeries = chart.addCandlestickSeries();
      const processed = processData(data);
      candlestickSeries.setData(
        processed.map((item) => {
          return {
            time: formatDate(item.timestamp),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          };
        })
      );
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
