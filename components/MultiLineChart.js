// MultiLineChart.js
import React from "react";
import { ScrollView } from "react-native";
import LineChartComponent from "./LineChart"; // Update the import path based on your project structure

const MultiLineChart = ({ chartDataList }) => {
  return (
    <ScrollView vertical pagingEnabled>
      {chartDataList.map((chartData, index) => (
        <LineChartComponent
          key={index}
          data={chartData.data}
          labels={chartData.labels}
          //title="Velocidade do vento" //{`Chart ${index + 1}`} // You can customize the title here
        />
      ))}
    </ScrollView>
  );
};

export default MultiLineChart;
//esse é meu arquivo MultiLineChart.js
