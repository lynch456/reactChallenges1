import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_open).getTime(),
                price.open.toFixed(3),
                price.high.toFixed(3),
                price.low.toFixed(3),
                price.close.toFixed(3),
              ]) as any,
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
