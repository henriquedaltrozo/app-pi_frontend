import React from "react";
import { ScrollView } from "react-native";
import LineChartComponent from "./LineChart"; 

const MultiLineChart = ({ chartDataList }) => {
  return (
    <ScrollView vertical pagingEnabled>
      {chartDataList.map((chartData, index) => (
        <LineChartComponent
          key={index}
          data={chartData.data}
          labels={chartData.labels}
        />
      ))}
    </ScrollView>
  );
};

export default MultiLineChart;
