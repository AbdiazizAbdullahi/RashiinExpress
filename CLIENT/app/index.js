import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const AppOpening = () => {
  return (
    <View>
        <Pressable onPress={() => {
            router.push('home')
        }}>
            <Text>Redirect to home!</Text>
        </Pressable>
      
    </View>
  )
}

export default AppOpening