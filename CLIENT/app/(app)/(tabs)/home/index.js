import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import useUserStore from '../../../../store/UserStore';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import popular from '../../../../assets/popular.png'
import offers from '../../../../assets/offers.png'
import logo from '../../../../assets/SecondaryLogo.png'
import grocery from '../../../../assets/grocery.png'
import drinks from '../../../../assets/drinks.png'
import dairy from '../../../../assets/dairy.png'
import snacks from '../../../../assets/snacks.png'
import cleaning from '../../../../assets/cleaning.png'
import gas from '../../../../assets/gas.png'
import babyCare from '../../../../assets/babyCare.png'
import personalCare from '../../../../assets/skinCare.png'
import homecare from '../../../../assets/tape.png'
import jam from '../../../../assets/jam.png'
import oil from '../../../../assets/oil.png'
import spices from '../../../../assets/spices.png'
import nonFoodOthers from '../../../../assets/nonFoodOthers.png'


const Home = () => {
  const user = useUserStore((state) => state.user);

  console.log(user)

  useEffect(() => {
    useUserStore.getState().initializeUser();
  }, [])

  
  
  return (
    <View style={{flex: 1, alignItems:'center'}}>
      <StatusBar style="light" />
      <View style={{alignItems:'center', backgroundColor:'#1F6E3C', height: 130,width: '100%', padding: 2}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '96%', marginTop: 40}} >
          <View style={{}}>
            <Image source={logo} style={{ width: 55, height: 55 }} />
          </View>
          <TouchableOpacity onPress={() => router.push('(search)/search')} style={{paddingRight: 5}}>
            <FontAwesome name="search" size={28} color="#EEEEEE" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD700', width: '100%', height: 30}}>
          <AntDesign name="notification" size={18} color="#4C4C4C" />
          <Text style={{color: '#4C4C4C', textAlign:'center', fontSize: 14, fontWeight: 'bold', marginLeft: 10}}>FREE DELIVERY ON ALL ORDERS</Text>
        </View>
      </View>

      <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#EEEEEE'}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row', alignContent:'center', justifyContent: 'space-around', height: 80, width:'96%', padding: 2, borderRadius:10, marginTop: 20}}>
            <View style={{justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity onPress={() => router.push('(homeScreen)/Offer')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', height: 60, width: 60, borderRadius: 20, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5}}>
                  <Image source={offers} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>OFFERS</Text>
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity onPress={() => router.push('(homeScreen)/Popular')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', height: 60, width: 60, borderRadius: 20, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5}}>
                <View >
                  <Image source={popular} style={{ width: 40, height: 40 }} />
                </View>
              </TouchableOpacity>
              <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>POPULAR</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', height: 20, width: '90%', marginTop: 15, marginBottom: 3}}>
            <AntDesign name="caretright" size={14} color="#1F6E3C" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#1F6E3C', marginLeft: 2}}>Food categories</Text>
          </View>

          <View style={{flex: 1, alignContent:'center', justifyContent: 'center', backgroundColor:'#FFFFFF', height: 250, width:'90%', padding: 2, borderRadius:10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5}}>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
              <TouchableOpacity onPress={() => router.push('(categories)/Dry-foods')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={grocery} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#4C4C4C', marginTop: 5}}>DRY FOODS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(categories)/Beverages')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={drinks} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>BEVERAGES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(categories)/Dairy')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={dairy} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>DAIRY</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
              <TouchableOpacity onPress={() => router.push('(categories)/Snacks')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={snacks} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>SNACKS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(categories)/Oil&Butter')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={oil} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>OIL & BUTTER</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(categories)/OtherFoods')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={jam} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>OTHERS</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', height: 20, width: '90%', marginTop: 20, marginBottom: 3}}>
            <AntDesign name="caretright" size={14} color="#1F6E3C" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#1F6E3C', marginLeft: 2}}>Non-food essentials</Text>
          </View>

          <View style={{flex: 1, alignContent:'center', justifyContent: 'center', backgroundColor:'#FFFFFF', height: 250, width:'90%', padding: 2, borderRadius:10, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5}}>

          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/Gas')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={gas} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>GAS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/PersonalCare')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={personalCare} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#4C4C4C', marginTop: 5}}>PERSONAL CARE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/Cleaning')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={cleaning} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5, textAlign: 'center'}}>CLEANING ESSENTIALS</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 120}}>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/HomeMaintenance')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={homecare} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5, textAlign: 'center'}}>HOME MAINTENANCE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/BabyCare')} style={{flex: 1, justifyContent: 'center', alignItems: 'center',height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={babyCare} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>BABY CARE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('(Non-food-essentials)/OtherEssentials')} style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE', height: 60, width: 60, borderRadius: 20}}>
                  <Image source={nonFoodOthers} style={{ width: 45, height: 45 }} />
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, color: '#4C4C4C', marginTop: 5}}>OTHERS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home