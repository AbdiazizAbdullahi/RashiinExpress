import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function OrderConfirmation() {
  return (
    <View>
      <View >
        <Text >Your Order has been placed</Text>
        <View >
          <Ionicons name="checkmark-circle" size={36} color="black" />
        </View>
      </View>
      <View >
        <TouchableOpacity onPress={() => router.push('home')}>
          <Text >Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}