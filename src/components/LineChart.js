import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartComponent = ({ data, labels, title }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>
        {title}
      </Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={300} 
        height={230}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, 
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginBottom: 30,
        }}
        withVerticalLabels={false}
      />
    </View>
  );
};

export default LineChartComponent;
