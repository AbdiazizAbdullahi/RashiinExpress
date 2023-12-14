import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const Home = () => {
  return (
  <ScrollView showsHorizontalScrollIndicator={false} >
      <StatusBar style="light" />
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
      <View style={{flex: 1, alignItems:'center', backgroundColor:'#1F6E3C', height: 250,width: '100%', padding: 2, borderRadius:20,}}>
        <TextInput style={{backgroundColor:'rgba(255, 255, 255, 0.3)', width: '100%', height: 40, borderRadius: 20, padding: 10, marginTop:40, color:'#F5F5F5'}} placeholder="Search" placeholderTextColor="#F5F5F5" />
        <View style={{ backgroundColor: '#FFD700', width: '100%', height: 40, marginTop: 20}}>
          <Text style={{color: '#4C4C4C', textAlign:'center', fontSize: 14, fontWeight: 'bold', marginTop: 20}}>FREE DELIVERY ON ALL ORDERS ABOVE KSH.1500</Text>
        </View>
        <View style={{backgroundColor:'#FFFFFF', width: '92%', height: 200, borderRadius: 10, marginTop: 20, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3 }}></View>
      </View>
      <View style={{flex: 1, alignContent:'center', justifyContent: 'center', backgroundColor:'#FFFFFF', height: 250, width:'92%', padding: 2, borderRadius:10, marginTop: 130, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}></View>
      <View style={{flex: 1, alignContent:'center', justifyContent: 'center', backgroundColor:'#FFFFFF', height: 350, width:'92%', padding: 2, borderRadius:10, marginTop: 20, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}></View>
      <View style={{flex: 1, alignContent:'center', justifyContent: 'center', backgroundColor:'#FFFFFF', height: 200, width:'92%', padding: 2, borderRadius:10, marginTop: 20, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}></View>
      </View>
    </ScrollView>
  )
}

export default Home