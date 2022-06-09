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
}

function Chart({ coinId }: ChartProps) {
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
                price.open,
                price.high,
                price.low,
                price.close,
              ]) as any,
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46", // 상승 시 색상
                  downward: "#3C90EB", // 하락 시 색상
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
