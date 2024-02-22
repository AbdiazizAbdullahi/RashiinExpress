import { View, Text, ActivityIndicator } from 'react-native'
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../../../firebaseConfig';

export default function Address() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const addressId = "V3r9KSConNz99AjRnT3U";

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);

        const db = getFirestore(app);
        const addressRef = doc(db, 'Address', addressId); 

        const addressInfo = await getDoc(addressRef);
        if (addressInfo.exists()) {
          const addressData = addressInfo.data();
          setAddress(addressData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setLoading(false);
      }
    };

    fetchAddress();
  }, [addressId]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <ActivityIndicator size="large" color="#1F6E3C" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE'}}>
      <View style={{backgroundColor: '#FFFFFF', marginTop: 70, width: '85%', padding: 10, borderRadius: 10}}>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Country:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{address.Country}</Text>
          </View>
        </View>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>City:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{address.City}</Text>
          </View>
        </View>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Area:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{address.Area}</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <View >
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Estate / Apartment:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5, marginBottom: 10}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{address.Estate}</Text>
          </View>
          <View style={{marginTop: 30}}>
          <View >
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>HouseNo:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5, marginBottom: 10}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{address.HouseNo}</Text>
          </View>
        </View>
        </View>
      </View>
    </View>
  )
}