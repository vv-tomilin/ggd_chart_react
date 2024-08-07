import React, { act } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { millisecondsToFormattedString } from "../utils/timeConverter";

const GGDChart = ({ data }) => {
  // Преобразование данных в нужный формат
  const plannedDepths = data.map((item) => ({
    x: item.plan.date,
    y: item.plan.depth,
    operationCount: item.operationCount,
    operationName: item.operationName,
  }));

  const actualDepths = data.map((item) => ({
    x: item.fact.date,
    y: item.fact.depth,
    operationCount: item.operationCount,
    operationName: item.operationName,
  }));

  // Настраиваем параметры графика ГГД
  const options = {
    chart: {
      type: "line",
      width: 1500,
      height: 700,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        overflow: "justify",
      },
      title: {
        text: "Дата",
      },
    },
    yAxis: {
      reversed: true,
      title: {
        text: "Глубина",
      },
    },
    series: [
      {
        name: "План",
        data: plannedDepths,
        color: "green",
      },
      {
        name: "Факт",
        data: actualDepths,
        color: "red",
      },
    ],
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>
                  №: ${this.point.operationCount}<br/>
                  Дата: ${millisecondsToFormattedString(this.x)}<br/>
                  Глубина: ${this.y}<br/>
                  Операция: ${this.point.operationName}
                  `;
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GGDChart;
