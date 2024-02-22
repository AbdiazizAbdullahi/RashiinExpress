import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import { app } from "../../../firebaseConfig";
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function Gas() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Products"), where("Category", "==", "Gas"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(products);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1F6E3C" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', marginBottom: 25,}}>
      <StatusBar style="light" />
      <View style={{ height: '100%', width: '98%', backgroundColor: "#EEEEEE", margin: 20}}>
        <FlashList
          
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => 
            <View style={{flex: 1, alignItems: 'center', padding: 3, backgroundColor: "#FFFFFF", margin: 7, borderRadius: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5 }}>
              <TouchableOpacity onPress={() => router.push(`product/${item.id}`)}>
                <View style={{alignItems: 'center',marginTop: 5}}>
                <Image source={{
                  uri: item.Image,
                }} 
                style={{ width: 150, height: 150, borderRadius: 10 }} 
                />
                </View>
                <View >
                  <Text style={{ color: '#4C4C4C', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{item.Brand} {item.Name} {item.Size}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3}}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Ksh {item.Price}</Text>
                    <Text style={{ color: item.Stock == 'In stock' ? '#1F6E3C' : '#DC143C', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'bottom' }}>{item.Stock}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
          estimatedItemSize={100}
        />
      </View>
    </View>
  )
}