// This screen will contain all the neccessary things for the account screen of a grocery app.
// Account screen will contain:
// 1. User's account details (This will be a list of all the details of a user's account.)
// 2. User's order history (This will be a list of all the orders that a user has made on the app.)
// 3. Coupons (Coupons are discounts that a user can use to get discounts on products.)
// 4. Contact us
// 5. Logout
// 6. Address
// 7. Adeego Coins (Adeego coins are points that a user earns when they shop on Adeego. They can be used to get discounts on products.)

import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import profile from '../../../../assets/profile.png'
import orders from '../../../../assets/orders.png'
import coupons from '../../../../assets/coupons.png'
import contactus from '../../../../assets/contactus.png'
import adeegocoins from '../../../../assets/adeego-coins.png'
import address from '../../../../assets/address.png'

const Account = () => {
  return (
    <View style={{flex: 1, alignItems: 'center' }}>

      <View style={{flexDirection: 'row',height: 130, width: '100%', backgroundColor: '#1F6E3C'}}>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 70}}>
          <View>
            <MaterialCommunityIcons name="account-details" size={48} color="#FFD700" />
          </View>
          <View style={{marginLeft: 10, marginTop: 2}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#EEEEEE'}}>ABDIAZIZ</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#EEEEEE'}}>******5949</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 73}}>
          <View >
            <Ionicons name="location-sharp" size={24} color="#FFD700" />
          </View>
          <View>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#EEEEEE', marginTop: 5}}>NAIROBI - SOUTH C</Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', height: 20, width: '98%', marginTop: 20}}>
        <AntDesign name="caretright" size={14} color="#4C4C4C" />
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4C4C4C', marginLeft: 2}}>MY ADEEGO ACCOUNT</Text>
      </View>

      <View id='menu' style={{flexDirection: 'column', width: '96%', backgroundColor: '#FFFFFF', borderRadius: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(profile)/profile')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={profile} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(orders)/orders')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={orders} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(coins)/coins')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={adeegocoins} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>ADEEGO COINS</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(contactus)/contactus')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={contactus} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>CONTACT US</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(address)/address')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={address} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>ADDRESS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('(account-menu)/(coupons)/coupons')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
              <Image source={coupons} style={{ width: 45, height: 45 }} />
            </View>
            <Text style={{fontSize: 12, fontWeight: 600, color: '#1F6E3C', marginTop: 5}}>COUPONS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Account