import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function CompareChart({ chartData }) {
  const computedStyle = getComputedStyle(document.documentElement);
  const paper_bgcolor_theme = computedStyle
    .getPropertyValue(`--background-color`)
    .trim();
  const text_color_theme = computedStyle
    .getPropertyValue(`--text-color`)
    .trim();
  const button_bgcolor = computedStyle
    .getPropertyValue(`--button-background`)
    .trim();
  const button_activecolor = computedStyle
    .getPropertyValue(`--button-hover-background`)
    .trim();

  // Process the data for each stock symbol into its own series
  const seriesData = Object.entries(chartData || {}).map(([symbol, data]) => {
    const dataPoints = Object.entries(data || {}).map(([date, value]) => {
      return [
        new Date(date).getTime(), // Date as timestamp
        value.percentage_change, // Percentage change for the day
      ];
    });

    return {
      name: symbol,
      data: dataPoints,
    };
  });

  const options = {
    rangeSelector: {
      selected: 1,
      buttonTheme: {
        fill: button_bgcolor,
        style: {
          color: text_color_theme,
        },
        states: {
          hover: {
            fill: button_activecolor,
          },
          select: {
            fill: button_activecolor,
          },
        },
      },
    },
    chart: {
      type: "line",
      height: 575,
      backgroundColor: paper_bgcolor_theme,
      style: {
        fontFamily: "Arial",
        color: text_color_theme,
      },
    },
    title: {
      text: "Daily Percentage Change Over Time",
      style: {
        color: text_color_theme,
      },
    },
    xAxis: {
      type: "datetime",
      lineColor: text_color_theme,
      lineWidth: 1,
      labels: {
        style: {
          color: text_color_theme,
        },
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "fullscreen",
            "printChart",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
    yAxis: {
      title: {
        text: "Percentage Change",
        style: {
          color: text_color_theme,
        },
      },
      labels: {
        style: {
          color: text_color_theme,
        },
      },
      height: "60%",
      lineWidth: 2,
      resize: {
        enabled: true,
      },
      gridLineColor: button_bgcolor,
    },
    series: seriesData,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 600,
            },
            navigator: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}

export default React.memo(CompareChart);
