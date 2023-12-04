// ChartCarousel.js
import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import LineChartComponent from './LineChart';

const ChartCarousel = ({ dataSets }) => {
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.feedItem}>
        <View style={styles.chartContainer}>
          <LineChartComponent data={item.data} labels={item.labels} />
        </View>
        <Text style={styles.timestamp}>Posted {index + 1} hour ago</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Carousel
          data={dataSets}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          layout="default"
          horizontal
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom
  },
  container: {
    flex: 1,
  },
  feedItem: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center', // Center content horizontally
  },
  chartContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 16,
    overflow: 'hidden',
  },
  timestamp: {
    marginTop: 8,
    color: 'white',
  },
});

export default ChartCarousel;
