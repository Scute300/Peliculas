import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/Pages/HomePage/HomePage'
export default function App() {
  return (
    <View style={styles.container}>
      <HomePage/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
