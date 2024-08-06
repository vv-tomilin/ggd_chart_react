import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { millisecondsToFormattedString } from "../utils/timeConverters";

const GGDChart = ({ data }) => {
  // Преобразование данных в нужный формат
  const plannedDepths = data.map((item) => ({
    x: item.plan.date,
    y: item.plan.depth,
    operationCount: item.operationCount,
    operationName: item.operationName, // Добавляем описание операции
  }));

  const actualDepths = data.map((item) => ({
    x: item.fact.date,
    y: item.plan.depth,
    operationCount: item.operationCount,
    operationName: item.operationName, // Добавляем описание операции
  }));

  // Настраиваем параметры графика ГГД
  const options = {
    chart: {
      type: "line",
      width: "80%",
      height: 600,
    },
    title: {
      text: "Сетевой график",
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
