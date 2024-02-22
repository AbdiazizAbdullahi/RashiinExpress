import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack >
        <Stack.Screen name="(auth)/Login" options={{
          headerShown: true,
          title: 'LOGIN'
        }}/>
        <Stack.Screen name="(auth)/Signup" options={{
          headerShown: true,
          title: 'SIGNUP'
        }}/>
        <Stack.Screen name="(auth)/UserDetails" options={{
          headerShown: true,
          title: 'USER DETAILS'
        }}/>
    </Stack>
  )
}