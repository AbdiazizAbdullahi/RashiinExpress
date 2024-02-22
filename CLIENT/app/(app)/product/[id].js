import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, getDocs, query, collection, where } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import useUserStore from '../../../store/UserStore';
import Toast from '../../../components/Toast';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import { router } from 'expo-router';

const ItemDetail = () => {
  const { id } = useLocalSearchParams()
  const [details, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ProductId, setProductId] = useState(null);
  const user = useUserStore((state) => state.user);
  const [toastMessage, setToastMessage] = useState(null);
  const [hour, setHour] = useState(new Date().getHours());
  const [data, setData] = useState([]);

  const showToast = (iconName, text, color = 'blue' ) => {
    setToastMessage({ text, color, iconName });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide the toast after 4 seconds
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatHour = (hour) => {
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    return hour + ' ' + ampm;
  };


  useEffect( () => {

    // Fetch item detail from Firestore
    const fetchItemDetail = async () => {
      try {
        setLoading(true);

        const db = getFirestore(app);
        const itemRef = doc(db, 'Products', id);
        const itemDoc = await getDoc(itemRef);
        if (itemDoc.exists()) {
          const itemData = itemDoc.data();
          const itemDetail = { ...itemData, id: itemDoc.id };
          setDetail(itemDetail);
          setLoading(false);

        } else {
          setLoading(false);
          console.log('Item not found');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching item detail:', error);
      }
    };

    useUserStore.getState().initializeUser();
    fetchItemDetail();
  }, [id]);


    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Products"), where("Category", "==", details.Category));
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

  useEffect(() => {
    if (details) {
      setProductId(details.id);

      fetchData();
    }
  }, [details]);


  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <ActivityIndicator size="large" color="#1F6E3C" />
      </View>
    );
  }
  
  // const collectionId = "iRndPx499rWaAeCrM0or";
  const { Name, Brand, Size, Price, Image: Photo, Stock } = details;

  // Function to add an item to the cart
  const AddToCart = async () => {
    try {
      
      
      const db = getFirestore(app);
      const cartId = user.CartId;
      const cartRef = doc(db, 'Cart', cartId);

      // Retrieve the current cart document
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists() && details.Stock == 'In stock') {
        const cartData = cartDoc.data();
        // Check if the product already exists in the cart
        const existingItemIndex = cartData.Items.findIndex(Item => Item.ProductId === ProductId);

        if (existingItemIndex !== -1) {
          // Update the quantity of the existing item
          const updatedItems = [...cartData.Items];
          updatedItems[existingItemIndex].Quantity += 1;

          // Update the cart document with the modified items array
          await updateDoc(cartRef, { Items: updatedItems });
        } else {
          // Add a new item to the items array
          const newItem = {
            ProductId: ProductId,
            Quantity: 1,
            Name: Name,
            Brand: Brand,
            Size: Size,
            Price: Price,
            Image: Photo,
            Stock: Stock,
          };
          await updateDoc(cartRef, { Items: arrayUnion(newItem) });
        }
      } else if (details.Stock == 'Out of stock') {
        showToast('warning', 'This item is out of stock', '#4C4C4C');
      } else {
        console.log('Cart not found');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

    // Function to add an item to the collection
  const AddToCollection = async () => {
    try {
      
      const db = getFirestore(app);
      const collId = user.CollectionId;
      const collRef = doc(db, 'Collection', collId);

      // Retrieve the current cart document
      const collDoc = await getDoc(collRef);

      if (collDoc.exists()) {
        const collData = collDoc.data();

        // Check if the product already exists in the cart
        const existingItemIndex = collData.Items.findIndex(Item => Item.ProductId === ProductId);

        if (existingItemIndex !== -1) {
          // alert the user that the item is already in the collection
          console.log("This item is already in your collection");
        } else {
          // Add a new item to the items array
          const newItem = {
            ProductId: ProductId,
            Name: Name,
            Brand: Brand,
            Size: Size,
            Price: Price,
            Image: Photo,
            Stock: Stock,
          };
          await updateDoc(collRef, { Items: arrayUnion(newItem) });
        }
      } else {
        console.log('Collection not found');
      }
    } catch (error) {
      console.error('Error adding item to collection:', error);
    }
  };


  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE'}}>
      <View style={{width: '100%', height: '88%',}}>
        <ScrollView >
          <View style={{flex: 1, alignItems: 'center', alignSelf: 'center', backgroundColor: '#FFFFFF', width: '93%', marginTop: 10, marginBottom: 10, borderRadius: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5}}>
            <View style={{width: '95%', height: 305, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE', marginTop: 10, borderRadius: 10 }}>
              <Image source={{ uri: details.Image }} style={{ width: 300, height: 300 }} />
            </View>
            <View style={{flex: 1, width: '95%', marginBottom: 20}}>
              <View >
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4C4C4C', marginLeft: 5}}>{details.Brand} {details.Name} {details.Size} Orange Flavour </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000', marginLeft: 5}}>Ksh {details.Price}</Text>
                <Text style={{color: details.Stock == 'In stock' ? '#1F6E3C' : '#DC143C', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'bottom' , marginLeft: 5}}>{details.Stock}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, borderColor: '#1F6E3C', borderWidth: 1, borderRadius: 20, height: 30, width: 165, backgroundColor: '#d1ffe2'}}>
                <FontAwesome name="motorcycle" size={20} color="#1F6E3C" />
                <Text style={{fontSize: 14, fontWeight: '700', color: '#1F6E3C', marginLeft: 5}}>Express delivery</Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4C4C4C', marginLeft: 5}}>At your door step by: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#FFD700', borderWidth: 1, borderRadius: 20, height: 25, width: 185, backgroundColor: '#fff8d1', shadowColor:'#FFD700', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 }}>
                  <Ionicons name="timer" size={20} color="#FFD700" />
                  <Text style={{fontSize: 14, fontWeight: '700', color: '#FFD700', marginLeft: 5}}>Today {formatHour(hour)} - {formatHour(hour + 2)}</Text>
                </View>
                
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', height: 20, width: '95%', marginTop: 20, marginBottom: 3}}>
            <AntDesign name="caretright" size={14} color="#1F6E3C" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#1F6E3C', marginLeft: 2}}>Similar Items</Text>
          </View>

          <View style={{alignSelf: 'center', height: '100%', width: '95%', backgroundColor: "#EEEEEE", }}>
            <FlashList

              data={data}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => 
                <View style={{flex: 1, alignItems: 'center', padding: 1, backgroundColor: "#FFFFFF", margin: 3, borderRadius: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5 }}>
                  <TouchableOpacity onPress={() => router.push(`product/${item.id}`)}>
                    <View style={{flex: 1, alignItems: 'center',marginTop: 5, }}>
                      <Image source={{
                        uri: item.Image,
                      }} 
                      style={{ width: 100, height: 100, borderRadius: 10 }} 
                      />
                      <View style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F6E3C', width: 35, borderRadius: 10, position: 'absolute', top: 0, right: 0 }}>
                        <Text style={{ color: '#EEEEEE', fontSize: 12, fontWeight: '500' }}>{item.Price}</Text>
                      </View>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <Text style={{ color: '#4C4C4C', fontSize: 14, fontWeight: '500' }} numberOfLines={1}>{item.Brand} {item.Name} {item.Size}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              estimatedItemSize={100}
            />
          </View>
          
        </ScrollView>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFFFFF', width: '100%', padding: 5}}>
        <TouchableOpacity onPress={AddToCollection} style={{backgroundColor: '#FFD700', width: 200, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#4C4C4C'}}>ADD TO COLLECTION</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={AddToCart} style={{backgroundColor: '#1F6E3C', width: 150, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#EEEEEE'}}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
      {toastMessage && (
        <Toast iconName={toastMessage.iconName} message={toastMessage} onPress={() => setToastMessage(null)} />
      )}
    </View>
  )
}

export default ItemDetail

