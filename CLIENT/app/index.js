import React from 'react'
import "react-native-gesture-handler"
import { View, ActivityIndicator } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync();

export default function InitialScreen() {

  React.useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <View >
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}