"use client";
import { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";

const ApexChart = () => {
  const { singleData, chartData, days, currency, fetchChartData } =
    useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    fetchChartData(id);
  }, [currency, days, id]);

  return (
    <div className="w-full">
      <Chart
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            type: "area",
            background: "#14161A",
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: chartData?.map(([times]) => {
              const date = new Date(times);
              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");
              return `${hours}:${minutes}`;
            }),
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
        }}
        series={[
          {
            name: `${singleData?.name}`,
            data: chartData?.map((data) => data[1].toFixed(0)),
            color: "#87CEEB",
          },
        ]}
        type="area"
        height="330px"
        className="w-[95%] max-w-[900px]"
      />
    </div>
  );
};

export default ApexChart;
