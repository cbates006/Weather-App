/*
File: Location.tsx          Date: 1/25/2024
   This screen defines the screen for the list of alternate 
   locations.  

   Modification Log
   
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Location() {
  return (
    <View style={styles.container}>
        <Text>Location Screen</Text>
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

export default Location