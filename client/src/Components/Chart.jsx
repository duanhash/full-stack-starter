import { useState, useEffect } from "react";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import StockChart from "highcharts/modules/stock";
import { useSelector } from "react-redux";

StockChart(Highcharts);

const Chart = () => {
  const { graphData } = useSelector((state) => state.search);
  const [ohlc, setOhlc] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    const ohlcData = [],
      volumeData = [];

    graphData.values.map((obj) => {
      ohlcData.push([
        Date.parse(obj.datetime),
        parseFloat(obj.open),
        parseFloat(obj.high),
        parseFloat(obj.low),
        parseFloat(obj.close),
      ]);

      volumeData.push([Date.parse(obj.datetime), parseFloat(obj.volume)]);
    });

    setOhlc(ohlcData);
    setVolume(volumeData);
    console.log(ohlcData);
    console.log(volumeData);
  }, [graphData]);

  const options = {
    colors: ["#8b5cf6", "#414558", "#272935", "#60a5fa"],

    scrollbar: {
      barBackgroundColor: "#60a5fa",
      liveRedraw: true,
    },

    chart: {
      height: 600,
      backgroundColor: "#414558",
    },

    loading: {
      color: "#FFFFFF",
    },

    credits: {
      enabled: false,
    },

    rangeSelector: {
      inputEnabled: false,
      dropdown: "responsive",
      selected: 0,

      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 month",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          title: "View 6 months",
        },
        {
          type: "ytd",
          text: "YTD",
          title: "View year to date",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          title: "View 1 year",
        },
        {
          type: "all",
          text: "All",
          title: "View all",
        },
      ],

      buttonTheme: {
        width: 40,
        fill: "#FFFFFF",
        r: 10,
        style: {
          color: "#60a5fa",
          fontWeight: "bold",
        },
      },
    },

    title: {
      text: `${graphData.meta.symbol.toUpperCase()} Historical Price and Volume`,
      style: {
        color: "#FFFFFF",
      },
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
          style: {
            color: "#FFFFFF",
          },
        },
        title: {
          text: "OHLC",
          style: {
            color: "#FFFFFF",
          },
        },
        height: "60%",
        lineWidth: 1,
        lineColor: "#FFFFFF",
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
          style: {
            color: "#FFFFFF",
          },
        },
        title: {
          text: "Volume",
          style: {
            color: "#FFFFFF",
          },
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 1,
        lineColor: "#FFFFFF",
      },
    ],

    xAxis: [
      {
        labels: {
          style: {
            color: "#FFFFFF",
          },
        },
        lineColor: "#FFFFFF",
        tickColor: "#FFFFFF",
      },
    ],

    tooltip: {
      backgroundColor: "#FFFFFF",
      borderColor: "#272935",
      split: true,
      style: {
        color: "#272935",
      },
    },

    series: [
      {
        type: "candlestick",
        name: graphData.meta.symbol.toUpperCase(),
        data: ohlc,
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default Chart;