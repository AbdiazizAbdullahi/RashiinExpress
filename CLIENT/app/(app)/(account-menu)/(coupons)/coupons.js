import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Coupons() {
  return (
    <View>
      <Stack.Screen options={{
          headerShown: true,
          title: 'COUPONS',
          headerBackVisible: false
        }}/>
      <Text>Coupons</Text>
    </View>
  )
}