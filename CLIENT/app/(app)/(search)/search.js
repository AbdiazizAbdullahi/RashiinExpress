import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

export default function Search() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (value) => {
    setSearch(value);
  }

const searchProducts = async () => {
  try {
    const db = getFirestore(app);
    const productsRef = collection(db, 'Products');

    // Create a query to search for products with similar keywords in multiple fields
    const q = query(productsRef,
      where('Keywords', 'array-contains', search.toLowerCase()),
    );

    const querySnapshot = await getDocs(q);
    const matchingProducts = [];

    querySnapshot.forEach((doc) => {
      // the data with the id
      const productData = { ...doc.data(), id: doc.id };
      matchingProducts.push(productData);

      // const productData = doc.data();
      // matchingProducts.push(productData);
    });
    console.log(matchingProducts);
    setSearchResults(matchingProducts);
    return matchingProducts;
  } catch (error) {
    console.error('Error searching products: ', error);
    return [];
  }
};

  return (
    <View style={{backgroundColor: '#EEEEEE', alignItems: 'center',}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#1F6E3C', width: '96%', padding: 5, marginTop: 5, borderColor: '#1F6E3C', borderWidth: 1}}>
        <TextInput 
          onChangeText={handleSearchChange}
          value={search}
         style={{backgroundColor:'rgba(255, 255, 255, 0.3)', width: '70%', height: 40, borderRadius: 10, padding: 10, color:'#FFFFFF', fontSize: 18}} placeholder="Search" placeholderTextColor="#EEEEEE" />
        <TouchableOpacity onPress={searchProducts}
          style={{flex: 1, height: 40, backgroundColor: '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 5}} >
          <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 18 }}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: '100%', width: '98%', backgroundColor: "#EEEEEE"}}>
        <FlashList
            
            data={searchResults}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => 
              <View style={{flex: 1, alignItems: 'center', padding: 3, backgroundColor: "#FFFFFF", margin: 5, borderRadius: 10}}>
                <TouchableOpacity onPress={() => router.push(`product/${item.id}`)}>
                  <View style={{borderRadius:10}}>
                  <Image source={{
                    uri: item.Image,
                  }} 
                  style={{ width: 170, height: 170, borderRadius: 10 }} 
                  />
                  </View>
                  <View >
                    <Text style={{ color: '#4C4C4C', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{item.Brand} {item.Name} {item.Size}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
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