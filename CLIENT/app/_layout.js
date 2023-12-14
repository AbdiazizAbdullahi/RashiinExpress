import React from 'react'
import { Stack } from 'expo-router'

// other screens are coins, orders, profile, contactus, coupons

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false 
        }}/>
        <Stack.Screen name="(account-menu)/(address)/address" options={{
          headerShown: true,
          title: 'ADDRESS'
        }}/>
        <Stack.Screen name="(account-menu)/(profile)/profile" options={{
          headerShown: true,
          title: 'PROFILE'
        }}/>
        <Stack.Screen name="(account-menu)/(orders)/orders" options={{
          headerShown: true,
          title: 'ORDERS'
        }}/>
        <Stack.Screen name="(account-menu)/(coupons)/coupons" options={{
          headerShown: true,
          title: 'COUPONS'
        }}/>
        <Stack.Screen name="(account-menu)/(contactus)/contactus" options={{
          headerShown: true,
          title: 'CONTACT US'
        }}/>
        <Stack.Screen name="(account-menu)/(coins)/coins" options={{
          headerShown: true,
          title: 'ADEEGO COINS'
        }}/>
    </Stack>
  )
}

export default RootLayout