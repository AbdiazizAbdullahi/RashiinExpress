import { Tabs } from 'expo-router'
import React from 'react'
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs 
    screenOptions={{
      tabBarActiveTintColor: "#1F6E3C",
      tabBarStyle: {
        height: 90
      },
      tabBarInactiveTintColor: "#4C4C4C",
      tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 10,
      },
      }}
      >
        <Tabs.Screen name="home/index" options={{
          headerShown: false,
          title: 'HOME',
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="home" size={24} color={focused ? '#1F6E3C' : '#4C4C4C'} />
          ),
        }}/>
        <Tabs.Screen name="cart/index"
        options={{
          headerShown: false,
          title: 'CART',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="shopping-cart" size={24} color={focused ? '#1F6E3C' : '#4C4C4C'} />
          ),
        }} />
        <Tabs.Screen name="collection/index" 
        options={{
          headerShown: false,
          title: 'COLLECTION',
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="inbox" size={24} color={focused ? '#1F6E3C' : '#4C4C4C'} />
          ),
        }}/>
        <Tabs.Screen name="account/index" 
        options={{
          headerShown: false,
          title: 'ACCOUNT',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="account" size={24} color={focused ? '#1F6E3C' : '#4C4C4C'} />
          ),
        }}/>
    </Tabs>
  )
}

export default TabsLayout