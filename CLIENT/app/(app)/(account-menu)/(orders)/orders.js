import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useAuthStore from '../../../../store/AuthStore'
import { router } from 'expo-router';

export default function Orders() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    useAuthStore.getState().checkLoginStatus();
  }, []);

  const handleLogout = () => {
    useAuthStore.getState().setLoggedIn(false);

    router.replace('/(auth)/Signup');
  }

  return (
    <View>
      <Text>Orders</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Order 1</Text>
      </TouchableOpacity>
    </View>
  )
}