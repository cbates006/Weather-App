/*
File: CurrentWeather.tsx          Date: 1/25/2024
   This screen defines the current weather display.  

   Modification Log
   1/28/2024 Changed the name of the screen from HomeScreen to
   CurrentWeather.  S. Sigman
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CurrentWeather() {
  return (
    <View style={styles.container}>
        <Text>MyWeather Home Screen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CurrentWeather